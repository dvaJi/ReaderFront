import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Query, graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// App Imports
import { Container, ButtonLink, Table } from 'common/ui';
import PostRow from './PostRow';
import { MetaTagList } from '../ABlogMetatag';
import { FETCH_ALL_POSTS_WITH_AGG } from '../queries';
import { REMOVE_POST } from '../mutations';
import { blogCategories, postsStatus, languages } from 'utils/common';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      perPage: 20,
      offset: 0
    };
  }

  handlePagination(page) {
    this.setState({ page: page, offset: page * this.state.perPage });
  }

  onRemove = async id => {
    if (id > 0) {
      const { perPage, offset } = this.state;
      let check = window.confirm(
        this.props.intl.formatMessage({
          id: 'confirm_delete_post',
          defaultMessage: 'confirm_delete_post'
        })
      );

      if (check) {
        await this.props.mutate({
          variables: { id: id },
          refetchQueries: [
            {
              query: FETCH_ALL_POSTS_WITH_AGG,
              variables: { first: perPage, offset: offset }
            }
          ]
        });
      }
    }
  };

  render() {
    const { perPage, offset } = this.state;
    return (
      <Container>
        <MetaTagList />
        <div style={{ margin: '10px 5px' }}>
          <ButtonLink
            to={'/admincp/blog/add_post'}
            style={{ marginBottom: 10 }}
          >
            <FontAwesomeIcon icon={faPlus} />{' '}
            <FormattedMessage id="add_post" defaultMessage="Add Post" />
          </ButtonLink>
          <Query
            query={FETCH_ALL_POSTS_WITH_AGG}
            variables={{ first: perPage, offset: offset }}
          >
            {({ loading, error, data }) => {
              if (loading)
                return (
                  <div>
                    <FormattedMessage
                      id="loading"
                      defaultMessage="Loading..."
                    />
                  </div>
                );
              if (error) return <p id="error_releases">Error :(</p>;
              return this.renderTable(data);
            }}
          </Query>
        </div>
      </Container>
    );
  }

  renderTable(data) {
    const totalPages = Math.ceil(
      data.postsAggregates.count / this.state.perPage
    );
    const paginationItems = new Array(totalPages).fill('pag');
    return (
      <div>
        <Table bordered hover>
          <thead>
            <tr>
              <th>
                <FormattedMessage id="title" defaultMessage="Title" />
              </th>
              <th>
                <FormattedMessage id="category" defaultMessage="Category" />
              </th>
              <th>
                <FormattedMessage id="status" defaultMessage="Status" />
              </th>
              <th>
                <FormattedMessage id="language" defaultMessage="Language" />
              </th>
              <th>
                <FormattedMessage id="created_at" defaultMessage="Created at" />
              </th>
              <th>
                <FormattedMessage id="updated_at" defaultMessage="Updated at" />
              </th>
              <th style={{ textAlign: 'center' }}>
                <FormattedMessage id="actions" defaultMessage="Actions" />
              </th>
            </tr>
          </thead>

          <tbody>
            {data.posts.length > 0 ? (
              data.posts.map(post => {
                const statusTxt = postsStatus.find(ps => ps.id === post.status);
                const categoryTxt = blogCategories.find(
                  cat => cat.id === post.category
                );
                const languageTxt = languages.find(
                  lang => lang.id === post.language
                );
                return (
                  <PostRow
                    key={post.uniqid}
                    post={post}
                    statusTxt={statusTxt}
                    categoryTxt={categoryTxt}
                    languageTxt={languageTxt}
                    onRemove={this.props.onRemove}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="7">
                  <FormattedMessage
                    id="posts_empty"
                    defaultMessage="Posts empty"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {data.postsAggregates.count > this.state.perPage && (
          <Pagination id="list_pagination" aria-label="pagination">
            {paginationItems.map((pg, index) => (
              <PaginationItem
                id={'pagination_item_' + index}
                key={pg + index}
                active={this.state.page === index}
              >
                <PaginationLink onClick={e => this.handlePagination(index)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </Pagination>
        )}
      </div>
    );
  }
}

export default graphql(REMOVE_POST)(injectIntl(List));
