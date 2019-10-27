import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import {
  Alert,
  Button,
  CustomInput,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

// App imports
import { slugify } from 'utils/helpers';
import { languagesAvailables } from 'utils/common';

class ChapterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: props.chapter,
      error: null
    };
  }

  handleOnChange = event => {
    let chapter = this.state.chapter;
    if (isNaN(event.target.value) || event.target.value === '') {
      chapter[event.target.name] = event.target.value.toString();
    } else {
      chapter[event.target.name] = parseInt(event.target.value, 0);
    }

    if (event.target.name === 'name') {
      chapter.stub = slugify(event.target.value);
    }

    this.setState({
      chapter
    });
  };

  handleOnChangeSelect = event => {
    let chapter = this.state.chapter;
    chapter[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    this.setState({
      chapter
    });
  };

  handleOnChangeDate = value => {
    let chapter = this.state.chapter;
    chapter.releaseDate = value.toString();
    this.setState({
      chapter
    });
  };

  handleOnChangeCheckbox = event => {
    let chapter = this.state.chapter;
    chapter[event.target.name] = !chapter[event.target.name];

    this.setState({
      chapter
    });
  };

  handleOnSubmit = ev => {
    const { intl, onSubmit } = this.props;
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      this.setState({
        error: intl.formatMessage({
          id: 'not_authenticated',
          defaultMessage: 'Not authenticated'
        })
      });
      return;
    }

    if (!this.state.chapter.chapter || this.state.chapter.chapter <= 0) {
      this.setState({
        error: intl.formatMessage({
          id: 'no_valid_chapter',
          defaultMessage: 'The chapter number must be greater than 0'
        })
      });
      return;
    }
    const chapter = Object.assign({}, this.state.chapter);
    const chStubNumber = chapter.chapter + '-' + chapter.subchapter + '_';
    chapter.stub = chStubNumber + (chapter.stub === null ? '' : chapter.stub);
    chapter.language =
      chapter.language === 0 ? languagesAvailables[0].id : chapter.language;
    chapter.hidden = chapter.hidden ? true : false;
    delete chapter.pages;

    this.setState({ error: null });
    onSubmit(ev, chapter);
  };

  render() {
    const { intl } = this.props;
    const { error, chapter } = this.state;
    return (
      <>
        {error && (
          <Alert id="error_msg" color="danger">
            {error}
          </Alert>
        )}
        <FormGroup>
          <Label for="name">
            <FormattedMessage id="name" defaultMessage="Name" />
          </Label>
          <Input
            id="name"
            type="text"
            placeholder={intl.formatMessage({
              id: 'name',
              defaultMessage: 'Name'
            })}
            name="name"
            autoComplete="off"
            value={chapter.name}
            onChange={this.handleOnChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="volume">
            <FormattedMessage id="volume" defaultMessage="Volume" />
          </Label>
          <Input
            id="volume"
            type="text"
            placeholder={intl.formatMessage({
              id: 'volume',
              defaultMessage: 'Volume'
            })}
            required="required"
            name="volume"
            autoComplete="off"
            value={chapter.volume}
            onChange={this.handleOnChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="chapter">
            <FormattedMessage id="chapter" defaultMessage="Chapter" />
          </Label>
          <Input
            id="chapter"
            type="number"
            placeholder={intl.formatMessage({
              id: 'chapter',
              defaultMessage: 'Chapter'
            })}
            required="required"
            name="chapter"
            autoComplete="off"
            value={chapter.chapter}
            onChange={this.handleOnChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="subchapter">
            <FormattedMessage id="subchapter" defaultMessage="Subchapter" />
          </Label>
          <Input
            id="subchapter"
            type="text"
            placeholder={intl.formatMessage({
              id: 'subchapter',
              defaultMessage: 'Subchapter'
            })}
            required="required"
            name="subchapter"
            autoComplete="off"
            value={chapter.subchapter}
            onChange={this.handleOnChange}
          />
        </FormGroup>
        {languagesAvailables.length > 1 && (
          <FormGroup>
            <Label for="language">
              <FormattedMessage id="language" defaultMessage="Language" />
            </Label>
            <Input
              type="select"
              name="language"
              id="language"
              required="required"
              value={chapter.language}
              onChange={this.handleOnChangeSelect}
            >
              {languagesAvailables.map(lang => (
                <option key={lang.id + lang.name} value={lang.id}>
                  {intl.formatMessage({
                    id: lang.name + '_full',
                    defaultMessage: lang.name
                  })}
                </option>
              ))}
            </Input>
          </FormGroup>
        )}
        <FormGroup>
          <Label for="releaseDate">
            <FormattedMessage id="releaseDate" defaultMessage="Release date" />
          </Label>
          <DatePicker
            selected={new Date(chapter.releaseDate)}
            onChange={this.handleOnChangeDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            dateFormat="MMMM d, yyyy h:mm aa"
            timeCaption="time"
            className="form-control"
          />
        </FormGroup>
        <FormGroup check>
          <CustomInput
            type="checkbox"
            id="hidden"
            name="hidden"
            label={intl.formatMessage({
              id: 'hidden',
              defaultMessage: 'Hidden'
            })}
            value={chapter.hidden}
            onChange={this.handleOnChangeCheckbox}
          />
        </FormGroup>
        <FormGroup>
          <Button
            id="submit_chapter"
            type="button"
            theme="secondary"
            onClick={this.handleOnSubmit}
          >
            <FontAwesomeIcon icon={faSave} />{' '}
            <FormattedMessage id="save" defaultMessage="Save" />
          </Button>
        </FormGroup>
      </>
    );
  }
}

export default ChapterForm;
