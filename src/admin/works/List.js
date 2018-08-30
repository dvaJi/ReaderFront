import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Container,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  UncontrolledTooltip
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

// App Imports
import {
  fetchWorks as getWorks,
  getAggregates
} from '../../works/actions/doWorks';
import { remove as removeWork } from '../../work/actions/doWork';
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
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      )
    };
  }

  componentDidMount() {
    this.props.getAggregates();
    this.props.getWorks(
      undefined,
      'ASC',
      this.state.perPage,
      'name',
      this.state.page
    );
  }

  handlePagination(page) {
    this.setState({ page: page });
    this.props.getWorks(
      undefined,
      'ASC',
      this.state.perPage,
      'name',
      page * this.state.perPage
    );
  }

  remove = id => {
    if (id > 0) {
      let check = window.confirm(this.context.t('confirm_delete_work'));

      if (check) {
        this.props
          .removeWork({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                console.error(response.data.errors[0].message);
              } else {
                this.props.getWorks(
                  undefined,
                  'ASC',
                  5,
                  'name',
                  this.state.page
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
          <Button tag={Link} to={'/admincp/work/add'}>
            {this.context.t('add')} Work
          </Button>

          <div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>{this.context.t('cover')}</th>
                  <th>{this.context.t('name')}</th>
                  <th>{this.context.t('type')}</th>
                  <th>{this.context.t('language')}</th>
                  <th>{this.context.t('created_at')}</th>
                  <th>{this.context.t('updated_at')}</th>
                  <th style={{ textAlign: 'center' }}>
                    {this.context.t('actions')}
                  </th>
                </tr>
              </thead>

              <tbody>
                {this.props.isLoading ? (
                  <tr>
                    <td colSpan="7">{this.context.t('loading')}</td>
                  </tr>
                ) : this.props.works.length > 0 ? (
                  this.props.works.map(
                    ({
                      id,
                      stub,
                      uniqid,
                      type,
                      works_covers,
                      works_descriptions,
                      name,
                      createdAt,
                      updatedAt
                    }) => (
                      <tr key={id}>
                        <td>
                          {works_covers.length > 0 ? (
                            <img
                              src={`/works/${stub}_${uniqid}/${
                                works_covers[0].filename
                              }`}
                              alt={name}
                              style={{ width: 80 }}
                            />
                          ) : (
                            <img
                              src="/static/images/default-cover.png"
                              alt={name}
                              style={{ width: 80 }}
                            />
                          )}
                        </td>

                        <td>
                          <Link to={'/admincp/work/' + id + '/' + stub}>
                            {name}
                          </Link>
                        </td>

                        <td>{type}</td>

                        <td style={{ textAlign: 'center' }}>
                          {works_descriptions.length > 0 ? (
                            works_descriptions.map((desc, i) => {
                              const comma = i !== 0 ? ', ' : '';
                              return (
                                comma +
                                this.state.languages.find(
                                  pl => pl.id === desc.language
                                ).name
                              );
                            })
                          ) : (
                            <span>
                              <FontAwesomeIcon
                                id={'noDescWarn-' + id}
                                title="asdasd"
                                color="#f2a900"
                                icon={faExclamationCircle}
                              />
                              <UncontrolledTooltip
                                placement="bottom"
                                target={'noDescWarn-' + id}
                              >
                                {this.context.t('work_no_desc_added')}
                              </UncontrolledTooltip>
                            </span>
                          )}
                        </td>

                        <td>{new Date(createdAt).toDateString()}</td>

                        <td>{new Date(updatedAt).toDateString()}</td>

                        <td style={{ textAlign: 'center' }}>
                          <ButtonGroup size="sm">
                            <Button
                              tag={Link}
                              to={'/admincp/work/edit/' + stub}
                            >
                              {this.context.t('edit')}
                            </Button>
                            <Button onClick={this.remove.bind(this, id)}>
                              {this.context.t('delete')}
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">{this.context.t('works_empty')}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {this.props.worksAgg &&
          this.props.worksAgg.count > this.state.perPage && (
            <Pagination aria-label="pagination">
              {new Array(
                Math.ceil(this.props.worksAgg.count / this.state.perPage)
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

// Component Properties
List.propTypes = {
  works: PropTypes.array.isRequired,
  getWorks: PropTypes.func.isRequired
};

List.contextTypes = {
  t: PropTypes.func.isRequired
};

// Component State
function listState(state) {
  return {
    works: state.works.works,
    isLoading: state.works.worksIsLoading,
    worksAgg: state.works.aggregates
  };
}

export default connect(
  listState,
  { getWorks, getAggregates, removeWork }
)(List);
