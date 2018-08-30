import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      let check = window.confirm(this.context.t('confirm_delete_chapter'));

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
            {this.context.t('go_back')}
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
            {this.context.t('add')} {this.context.t('chapter')}
          </Button>

          <div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>{this.context.t('volume')}</th>
                  <th>{this.context.t('chapter')}</th>
                  <th>{this.context.t('name')}</th>
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
                            <Button id={"edit-" + id}
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
                              {this.context.t('edit')}
                            </Button>
                            <Button id={"remove-" + id} onClick={this.remove.bind(this, id)}>
                              {this.context.t('delete')}
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6">{this.context.t('chapters_empty')}</td>
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

Detail.contextTypes = {
  t: PropTypes.func.isRequired
};

// Component State
function detailState(state) {
  return {
    chapters: state.reader.chapters,
    isLoading: state.reader.readerIsLoading
  };
}

export default connect(
  detailState,
  { getChapters, removeChapter }
)(Detail);
