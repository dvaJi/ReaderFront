import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';

// App Imports
import { fetchPosts, remove, getAggregates } from '../../blog/actions/doBlog';
import params from '../../params';

class List extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null,
      check: null,
      modal: false,
      page: 0,
      perPage: 20,
      postStatus: Object.keys(params.blog.status).map(
        k => params.blog.status[k]
      ),
      blogCategories: Object.keys(params.blog.categories).map(
        k => params.blog.categories[k]
      ),
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      )
    };
  }

  componentDidMount() {
    this.props.getAggregates(undefined, undefined, undefined, true);
    if (this.props.posts.length === 0) {
      this.props.fetchPosts(
        undefined,
        'DESC',
        this.state.perPage,
        'createdAt',
        this.state.page,
        true
      );
    }
  }

  handlePagination(page) {
    this.setState({ page: page });
    this.props.fetchPosts(
      undefined,
      'DESC',
      this.state.perPage,
      'createdAt',
      page * this.state.perPage,
      true
    );
  }

  remove = id => {
    if (id > 0) {
      let check = window.confirm(
        this.props.intl.formatMessage({
          id: 'confirm_delete_post',
          defaultMessage: 'confirm_delete_post'
        })
      );

      if (check) {
        this.props
          .remove({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                console.error(response.data.errors[0].message);
              } else {
                this.props.fetchPosts(
                  undefined,
                  'DESC',
                  5,
                  'createdAt',
                  this.state.page,
                  true
                );
              }
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  };

  render() {
    return (
      <Container>
        <div>
          <Button tag={Link} to={'/admincp/blog/add_post'}>
            <FormattedMessage id="add_post" defaultMessage="Add Post" />
          </Button>

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
                    <FormattedMessage
                      id="created_at"
                      defaultMessage="Created at"
                    />
                  </th>
                  <th>
                    <FormattedMessage
                      id="updated_at"
                      defaultMessage="Updated at"
                    />
                  </th>
                  <th style={{ textAlign: 'center' }}>
                    <FormattedMessage id="actions" defaultMessage="Actions" />
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.props.isLoading ? (
                  <tr>
                    <td colSpan="8">
                      <FormattedMessage
                        id="loading"
                        defaultMessage="Loading..."
                      />
                    </td>
                  </tr>
                ) : this.props.posts.length > 0 ? (
                  this.props.posts.map(
                    ({
                      id,
                      title,
                      stub,
                      uniqid,
                      type,
                      status,
                      category,
                      language,
                      createdAt,
                      updatedAt
                    }) => {
                      const statusTxt = this.state.postStatus.find(
                        ps => ps.id === status
                      );
                      const categoryTxt = this.state.blogCategories.find(
                        cat => cat.id === category
                      );
                      const languageTxt = this.state.languages.find(
                        lang => lang.id === language
                      );
                      return (
                        <tr key={id}>
                          <td>
                            <Link to={'/admincp/blog/edit_post/' + stub}>
                              {title}
                            </Link>
                          </td>

                          <td>
                            {categoryTxt !== undefined ? (
                              <FormattedMessage
                                id={categoryTxt.name}
                                defaultMessage={categoryTxt.name}
                              />
                            ) : (
                              'SIN ASIGNAR'
                            )}
                          </td>

                          <td>
                            {statusTxt !== undefined ? (
                              <FormattedMessage
                                id={statusTxt.name}
                                defaultMessage={statusTxt.name}
                              />
                            ) : (
                              'SIN STATUS'
                            )}
                          </td>

                          <td style={{ textAlign: 'center' }}>
                            <FormattedMessage
                              id={languageTxt.name + '_full'}
                              defaultMessage={languageTxt.name}
                            />
                          </td>

                          <td>{new Date(createdAt).toDateString()}</td>

                          <td>{new Date(updatedAt).toDateString()}</td>

                          <td style={{ textAlign: 'center' }}>
                            <ButtonGroup size="sm">
                              <Button
                                tag={Link}
                                to={'/admincp/blog/edit_post/' + stub}
                              >
                                <FormattedMessage
                                  id="edit"
                                  defaultMessage="Edit"
                                />
                              </Button>
                              <Button onClick={this.remove.bind(this, id)}>
                                <FormattedMessage
                                  id="remove"
                                  defaultMessage="Remove"
                                />
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      );
                    }
                  )
                ) : (
                  <tr>
                    <td colSpan="6">
                      <FormattedMessage
                        id="posts_empty"
                        defaultMessage="Posts empty"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {this.props.postsAgg &&
          this.props.postsAgg.count > this.state.perPage && (
            <Pagination aria-label="pagination">
              {new Array(
                Math.ceil(this.props.postsAgg.count / this.state.perPage)
              )
                .fill('pag')
                .map((pg, index) => (
                  <PaginationItem
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
      </Container>
    );
  }
}

// Component State
function listState(state) {
  return {
    posts: state.blog.posts,
    isLoading: state.blog.blogIsLoading,
    hasErrored: state.blog.blogHasErrored,
    language: state.layout.language,
    postsAgg: state.blog.aggregates
  };
}

export default injectIntl(
  connect(
    listState,
    { fetchPosts, remove, getAggregates }
  )(List)
);
