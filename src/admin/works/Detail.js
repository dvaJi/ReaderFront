import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';

// App Imports
import { fetchChapters as getChapters } from '../../reader/actions/doReader';
import { remove as removeChapter } from '../../releases/actions/doReleases';
import params from '../../params';

class Detail extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      success: null,
      check: null,
      modal: false,
      page: 0,
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      )
    };
  }

  componentDidMount() {
    this.props.getChapters(undefined, this.props.match.params.stub);
  }

  remove = id => {
    if (id > 0) {
      let check = window.confirm(
        this.props.intl.formatMessage({
          id: 'confirm_delete_chapter',
          defaultMessage: 'confirm_delete_chapter'
        })
      );

      if (check) {
        this.props
          .removeChapter({ id })
          .then(response => {
            if (response.status === 200) {
              if (response.data.errors && response.data.errors.length > 0) {
                console.error(response.data.errors[0].message);
              } else {
                this.props.getChapters(undefined, this.props.match.params.stub);
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
          <Button tag={Link} to={'/admincp/work/manage'}>
            <FormattedMessage id="go_back" defaultMessage="Go back" />
          </Button>
          <Button
            tag={Link}
            to={
              '/admincp/work/' +
              this.props.match.params.workId +
              '/' +
              this.props.match.params.workId +
              '/' +
              this.props.match.params.stub +
              '/chapter/add'
            }
          >
            <FormattedMessage id="add_chapter" defaultMessage="Add chapter" />
          </Button>

          <div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="volume" defaultMessage="Volume" />
                  </th>
                  <th>
                    <FormattedMessage id="chapter" defaultMessage="Chapter" />
                  </th>
                  <th>
                    <FormattedMessage id="name" defaultMessage="Name" />
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
                    <td colSpan="7">
                      <FormattedMessage
                        id="loading"
                        defaultMessage="Loading..."
                      />
                    </td>
                  </tr>
                ) : this.props.chapters.length > 0 ? (
                  this.props.chapters.map(
                    ({
                      id,
                      stub,
                      uniqid,
                      name,
                      chapter,
                      subchapter,
                      volume,
                      language,
                      createdAt,
                      updatedAt
                    }) => (
                      <tr key={id}>
                        <td>{volume}</td>
                        <td>
                          <Link
                            to={
                              '/admincp/work/' +
                              this.props.match.params.workId +
                              '/' +
                              this.props.match.params.stub +
                              '/chapter/' +
                              id
                            }
                          >
                            {chapter}.{subchapter}
                          </Link>
                        </td>

                        <td>{name}</td>

                        <td style={{ textAlign: 'center' }}>
                          {
                            this.state.languages.find(pl => pl.id === language)
                              .name
                          }
                        </td>

                        <td>{new Date(createdAt).toDateString()}</td>

                        <td>{new Date(updatedAt).toDateString()}</td>

                        <td style={{ textAlign: 'center' }}>
                          <ButtonGroup size="sm">
                            <Button
                              id={'edit-' + id}
                              tag={Link}
                              to={
                                '/admincp/work/' +
                                this.props.match.params.workId +
                                '/' +
                                this.props.match.params.stub +
                                '/chapter/edit/' +
                                id
                              }
                            >
                              <FormattedMessage
                                id="edit"
                                defaultMessage="Edit"
                              />
                            </Button>
                            <Button
                              id={'remove-' + id}
                              onClick={this.remove.bind(this, id)}
                            >
                              <FormattedMessage
                                id="delete"
                                defaultMessage="Delete"
                              />
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">
                      <FormattedMessage
                        id="chapters_empty"
                        defaultMessage="Chapters empty"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    );
  }
}

// Component Properties
Detail.propTypes = {
  chapters: PropTypes.array.isRequired
};

// Component State
function detailState(state) {
  return {
    chapters: state.reader.chapters,
    isLoading: state.reader.readerIsLoading
  };
}

export default injectIntl(
  connect(
    detailState,
    { getChapters, removeChapter }
  )(Detail)
);
