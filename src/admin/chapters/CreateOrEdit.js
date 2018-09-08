import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  Alert,
  Button,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { FormattedMessage, injectIntl } from 'react-intl';

// App imports
import { slug } from '../../utils/helpers';
import { createOrUpdate as chapterCreateOrUpdate } from '../../releases/actions/doReleases';
import { fetchChapter as getChapter } from '../../reader/actions/doReader';
import { upload } from '../../common/actions';
import params from '../../params';

class CreateOrEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      success: null,
      chapter: {
        workId: parseInt(this.props.match.params.workId, 0),
        chapter: 0,
        subchapter: 0,
        volume: 0,
        language: 0,
        name: '',
        stub: '',
        hidden: false,
        notShowAtStart: false,
        description: '',
        thumbnail: '',
        pages: []
      },
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      )
    };
  }

  componentDidMount() {
    if (
      !this.props.chapter ||
      this.props.chapter.id !== this.props.match.params.chapterId
    ) {
      this.getChapter(this.props.match.params.chapterId);
    }
  }

  getChapter = chapterId => {
    if (chapterId !== undefined) {
      this.props
        .getChapter(chapterId)
        .then(response => {
          this.setState({
            chapter: {
              ...this.props.chapter,
              workId: this.props.match.params.workId
            },
            pages: this.props.chapter.pages.map(pag => {
              return { ...pag, uploaded: true };
            })
          });
        })
        .catch(error => {
          this.setState({
            error: this.props.intl.formatMessage({
              id: 'error_fetching_chapter',
              defaultMessage:
                'There was some error fetching the chapter. Please try again.'
            })
          });
        });
    }
  };

  onChange = event => {
    let chapter = this.state.chapter;
    chapter[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);

    if (event.target.name === 'name') {
      chapter.stub = slug(event.target.value);
    }

    this.setState({
      chapter
    });
  };

  onChangeSelect = event => {
    let chapter = this.state.chapter;
    chapter[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    this.setState({
      chapter
    });
  };

  onSubmitChapter = event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    const chapter = Object.assign({}, this.state.chapter);
    delete chapter.pages;

    // Save work
    this.props
      .chapterCreateOrUpdate(chapter)
      .then(response => {
        this.setState({
          isLoading: false
        });

        if (response.data.errors && response.data.errors.length > 0) {
          this.setState({ error: response.data.errors[0].message });
        } else {
          this.setState({
            success: this.props.intl.formatMessage({
              id: 'chapter_saved',
              defaultMessage: 'Chapter saved successfully.'
            })
          });

          window.setTimeout(() => {
            this.props.history.push(
              '/admincp/work/' +
                this.props.match.params.workId +
                '/' +
                this.props.match.params.stub +
                '/chapter/edit/' +
                response.data.data.chapterCreate.id
            );
          }, 5000);
        }
      })
      .catch(error => {
        this.setState({
          error: this.props.intl.formatMessage({
            id: 'unknown_error',
            defaultMessage: 'There was some error. Please try again.'
          })
        });

        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    return (
      <div className="container">
        <div>
          {this.state.error && (
            <Alert id="error-alert" color="danger">
              {this.state.error}
            </Alert>
          )}
          <Link
            to={
              '/admincp/work/' +
              this.props.match.params.workId +
              '/' +
              this.props.match.params.stub
            }
          >
            <Button>
              <FormattedMessage id="go_back" defaultMessage="Go back" />
            </Button>
          </Link>

          <h4>
            {this.props.match.params.stub === undefined ? (
              <FormattedMessage id="create" defaultMessage="Create" />
            ) : (
              <FormattedMessage id="edit" defaultMessage="Edit" />
            )}{' '}
            <FormattedMessage id="chapter" defaultMessage="Chapter" />
          </h4>

          <Form onSubmit={this.onSubmitChapter}>
            <FormGroup>
              <Label for="name">
                <FormattedMessage id="name" defaultMessage="Name" />
              </Label>
              <Input
                id="name"
                type="text"
                placeholder={this.props.intl.formatMessage({
                  id: 'name',
                  defaultMessage: 'Name'
                })}
                required="required"
                name="name"
                autoComplete="off"
                value={this.state.chapter.name}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="volume">
                <FormattedMessage id="volume" defaultMessage="Volume" />
              </Label>
              <Input
                id="volume"
                type="text"
                placeholder={this.props.intl.formatMessage({
                  id: 'volume',
                  defaultMessage: 'Volume'
                })}
                required="required"
                name="volume"
                autoComplete="off"
                value={this.state.chapter.volume}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="chapter">
                <FormattedMessage id="chapter" defaultMessage="Chapter" />
              </Label>
              <Input
                id="chapter"
                type="text"
                placeholder={this.props.intl.formatMessage({
                  id: 'chapter',
                  defaultMessage: 'Chapter'
                })}
                required="required"
                name="chapter"
                autoComplete="off"
                value={this.state.chapter.chapter}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="subchapter">
                <FormattedMessage id="subchapter" defaultMessage="Subchapter" />
              </Label>
              <Input
                id="subchapter"
                type="text"
                placeholder={this.props.intl.formatMessage({
                  id: 'subchapter',
                  defaultMessage: 'Subchapter'
                })}
                required="required"
                name="subchapter"
                autoComplete="off"
                value={this.state.chapter.subchapter}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="language">
                <FormattedMessage id="language" defaultMessage="Language" />
              </Label>
              <Input
                type="select"
                name="language"
                id="language"
                required="required"
                value={this.state.chapter.language}
                onChange={this.onChangeSelect}
              >
                {this.state.languages.map(lang => (
                  <option key={lang.id + lang.name} value={lang.id}>
                    {this.props.intl.formatMessage({
                      id: lang.name + '_full',
                      defaultMessage: lang.name
                    })}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup check>
              <CustomInput
                type="checkbox"
                id="hidden"
                label={this.props.intl.formatMessage({
                  id: 'hidden',
                  defaultMessage: 'Hidden'
                })}
                value={this.state.chapter.hidden}
              />
              <CustomInput
                type="checkbox"
                id="notShowAtStart"
                label={this.props.intl.formatMessage({
                  id: 'not_show_at_start',
                  defaultMessage: 'Not show at start (Home and Releases)'
                })}
                value={this.state.chapter.notShowAtStart}
              />
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                theme="secondary"
                disabled={this.state.isLoading}
              >
                <FormattedMessage id="save" defaultMessage="Save" />
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

function CreateOrEditState(state, ownProps) {
  return {
    chapter: state.reader.chapter,
    match: state.match || ownProps.match
  };
}

const connectComponent = connect(
  CreateOrEditState,
  {
    chapterCreateOrUpdate,
    getChapter,
    upload
  }
)(CreateOrEdit);

export default injectIntl(withRouter(connectComponent));
