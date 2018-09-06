import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            error: this.context.t('error_fetching_chapter')
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
          this.setState({ success: this.context.t('chapter_saved') });

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
        this.setState({ error: this.context.t('unknown_error') });

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
            <Button>{this.context.t('go_back')}</Button>
          </Link>

          <h4>
            {this.props.match.params.chapterId === undefined
              ? this.context.t('create')
              : this.context.t('edit')}{' '}
            {this.context.t('chapter')}
          </h4>

          <Form onSubmit={this.onSubmitChapter}>
            <FormGroup>
              <Label for="name">{this.context.t('name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={this.context.t('name')}
                required="required"
                name="name"
                autoComplete="off"
                value={this.state.chapter.name}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="volume">{this.context.t('volume')}</Label>
              <Input
                id="volume"
                type="text"
                placeholder={this.context.t('volume')}
                required="required"
                name="volume"
                autoComplete="off"
                value={this.state.chapter.volume}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="chapter">{this.context.t('chapter')}</Label>
              <Input
                id="chapter"
                type="text"
                placeholder={this.context.t('chapter')}
                required="required"
                name="chapter"
                autoComplete="off"
                value={this.state.chapter.chapter}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="subchapter">{this.context.t('subchapter')}</Label>
              <Input
                id="subchapter"
                type="text"
                placeholder={this.context.t('subchapter')}
                required="required"
                name="subchapter"
                autoComplete="off"
                value={this.state.chapter.subchapter}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="language">{this.context.t('language')}</Label>
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
                    {this.context.t(lang.name + '_full')}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup check>
              <CustomInput
                type="checkbox"
                id="hidden"
                label={this.context.t('hidden')}
                value={this.state.chapter.hidden}
              />
              <CustomInput
                type="checkbox"
                id="notShowAtStart"
                label={this.context.t('notShowAtStart ')}
                value={this.state.chapter.notShowAtStart}
              />
            </FormGroup>
            <FormGroup>
              <Button
                type="submit"
                theme="secondary"
                disabled={this.state.isLoading}
              >
                {this.context.t('save')}
              </Button>
            </FormGroup>
          </Form>
        </div>
      </div>
    );
  }
}

CreateOrEdit.contextTypes = {
  t: PropTypes.func.isRequired
};

function CreateOrEditState(state, ownProps) {
  return {
    chapter: state.reader.chapter,
    match: state.match || ownProps.match
  };
}

export default withRouter(
  connect(
    CreateOrEditState,
    {
      chapterCreateOrUpdate,
      getChapter,
      upload
    }
  )(CreateOrEdit)
);
