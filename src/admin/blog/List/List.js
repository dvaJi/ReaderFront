import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App Imports
import { Container, ButtonLink, Table } from 'common/ui';
import PostRow from './PostRow';
import { MetaTagList } from '../ABlogMetatag';
import { FETCH_ALL_POSTS_WITH_AGG } from '../queries';
import { REMOVE_POST } from '../mutations';

const PER_PAGE = 20;

function List() {
  const { formatMessage: f } = useIntl();

  return (
    <Container>
      <MetaTagList />
      <div style={{ margin: '10px 5px' }}>
        <ButtonLink to={'/admincp/blog/add_post'} style={{ marginBottom: 10 }}>
          <FontAwesomeIcon icon="plus" />{' '}
          {f({ id: 'add_post', defaultMessage: 'Add Post' })}
        </ButtonLink>
        <PostsTable />
      </div>
    </Container>
  );
}

function PostsTable() {
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(0);
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_ALL_POSTS_WITH_AGG, {
    variables: { first: PER_PAGE, offset: offset }
  });
  const [removePost] = useMutation(REMOVE_POST);

  if (loading)
    return <div>{f({ id: 'loading', defaultMessage: 'Loading...' })}</div>;
  if (error) return <p id="error_releases">Error :(</p>;

  return (
    <div>
      <Table bordered hover>
        <thead>
          <tr>
            <th>{f({ id: 'title', defaultMessage: 'Title' })}</th>
            <th>{f({ id: 'category', defaultMessage: 'Category' })}</th>
            <th>{f({ id: 'status', defaultMessage: 'Status' })}</th>
            <th>{f({ id: 'language', defaultMessage: 'Language' })}</th>
            <th style={{ textAlign: 'center' }}>
              {f({ id: 'actions', defaultMessage: 'Actions' })}
            </th>
          </tr>
        </thead>

        <tbody>
          {data.posts.length > 0 ? (
            data.posts.map(post => (
              <PostRow
                key={post.uniqid}
                post={post}
                onRemove={async id => {
                  if (id > 0) {
                    let check = window.confirm(
                      f({
                        id: 'confirm_delete_post',
                        defaultMessage: 'confirm_delete_post'
                      })
                    );

                    if (check) {
                      await removePost({
                        variables: { id: id },
                        refetchQueries: [
                          {
                            query: FETCH_ALL_POSTS_WITH_AGG,
                            variables: {
                              first: PER_PAGE,
                              offset: offset
                            }
                          }
                        ]
                      });
                    }
                  }
                }}
              />
            ))
          ) : (
            <tr>
              <td colSpan="7">
                {f({
                  id: 'posts_empty',
                  defaultMessage: 'Posts empty'
                })}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {data.postsAggregates.count > PER_PAGE && (
        <BlogPagination
          data={data.postsAggregates}
          page={page}
          handleOnClick={page => {
            setPage(page);
            setOffset(page * PER_PAGE);
          }}
        />
      )}
    </div>
  );
}

function BlogPagination({ data, page, handleOnClick }) {
  const totalPages = Math.ceil(data.count / PER_PAGE);
  const paginationItems = new Array(totalPages).fill('pag');
  return (
    <Pagination id="list_pagination" aria-label="pagination">
      {paginationItems.map((pg, index) => (
        <PaginationItem
          id={'pagination_item_' + index}
          key={pg + index}
          active={page === index}
        >
          <PaginationLink onClick={() => handleOnClick(index)}>
            {index + 1}
          </PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );
}

export default List;
