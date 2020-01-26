import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

function ChapterForm({ chapter, onSubmit }) {
  const [localChapter, setLocalChapter] = useState(chapter);
  const [error, setError] = useState('');
  const { formatMessage: f } = useIntl();

  const handleOnChange = event => {
    let chapter = { ...localChapter };
    if (isNaN(event.target.value) || event.target.value === '') {
      chapter[event.target.name] = event.target.value.toString();
    } else {
      chapter[event.target.name] = parseInt(event.target.value, 0);
    }

    if (event.target.name === 'name') {
      chapter.stub = slugify(event.target.value);
    }

    setLocalChapter(chapter);
  };

  const handleOnChangeSelect = event => {
    let chapter = { ...localChapter };
    chapter[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    setLocalChapter(chapter);
  };

  const handleOnChangeDate = value => {
    let chapter = { ...localChapter };
    chapter.releaseDate = value.toString();

    setLocalChapter(chapter);
  };

  const handleOnChangeCheckbox = event => {
    let chapter = { ...localChapter };
    chapter[event.target.name] = !chapter[event.target.name];

    setLocalChapter(chapter);
  };

  const handleOnSubmit = ev => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      setError(
        f({
          id: 'not_authenticated',
          defaultMessage: 'Not authenticated'
        })
      );

      return;
    }

    if (!localChapter.chapter || localChapter.chapter <= 0) {
      setError(
        f({
          id: 'no_valid_chapter',
          defaultMessage: 'The chapter number must be greater than 0'
        })
      );
      return;
    }
    const chapter = { ...localChapter };
    const chStubNumber = chapter.chapter + '-' + chapter.subchapter + '_';
    chapter.stub = chStubNumber + (chapter.stub === null ? '' : chapter.stub);
    chapter.language =
      chapter.language === 0 ? languagesAvailables[0].id : chapter.language;
    chapter.hidden = chapter.hidden ? true : false;
    delete chapter.pages;

    setError(null);
    onSubmit(ev, chapter);
  };

  return (
    <>
      {error && (
        <Alert id="error_msg" color="danger">
          {error}
        </Alert>
      )}
      <FormGroup>
        <Label for="name">{f({ id: 'name', defaultMessage: 'Name' })}</Label>
        <Input
          id="name"
          type="text"
          placeholder={f({
            id: 'name',
            defaultMessage: 'Name'
          })}
          name="name"
          autoComplete="off"
          value={localChapter.name}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="volume">
          {f({ id: 'volume', defaultMessage: 'Volume' })}
        </Label>
        <Input
          id="volume"
          type="text"
          placeholder={f({
            id: 'volume',
            defaultMessage: 'Volume'
          })}
          required="required"
          name="volume"
          autoComplete="off"
          value={localChapter.volume}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="chapter">
          {f({ id: 'chapter', defaultMessage: 'Chapter' })}
        </Label>
        <Input
          id="chapter"
          type="number"
          placeholder={f({
            id: 'chapter',
            defaultMessage: 'Chapter'
          })}
          required="required"
          name="chapter"
          autoComplete="off"
          value={localChapter.chapter}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="subchapter">
          {f({ id: 'subchapter', defaultMessage: 'Subchapter' })}
        </Label>
        <Input
          id="subchapter"
          type="text"
          placeholder={f({
            id: 'subchapter',
            defaultMessage: 'Subchapter'
          })}
          required="required"
          name="subchapter"
          autoComplete="off"
          value={localChapter.subchapter}
          onChange={handleOnChange}
        />
      </FormGroup>
      {languagesAvailables.length > 1 && (
        <FormGroup>
          <Label for="language">
            {f({ id: 'language', defaultMessage: 'Language' })}
          </Label>
          <Input
            type="select"
            name="language"
            id="language"
            required="required"
            value={localChapter.language}
            onChange={handleOnChangeSelect}
          >
            {languagesAvailables.map(lang => (
              <option key={lang.id + lang.name} value={lang.id}>
                {f({
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
          {f({ id: 'releaseDate', defaultMessage: 'Release date' })}
        </Label>
        <DatePicker
          selected={new Date(localChapter.releaseDate)}
          onChange={handleOnChangeDate}
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
          label={f({
            id: 'hidden',
            defaultMessage: 'Hidden'
          })}
          value={localChapter.hidden}
          onChange={handleOnChangeCheckbox}
        />
      </FormGroup>
      <FormGroup>
        <Button
          id="submit_chapter"
          type="button"
          theme="secondary"
          onClick={handleOnSubmit}
        >
          <FontAwesomeIcon icon="save" />{' '}
          {f({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </FormGroup>
    </>
  );
}

export default ChapterForm;
