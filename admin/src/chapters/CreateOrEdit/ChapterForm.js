import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, FormGroup, Label } from 'reactstrap';
import { Input, Button } from 'common/ui';

import { slugify } from '../../../../shared/slugify';

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

  const handleOnChangeDate = value => {
    let chapter = { ...localChapter };
    chapter.releaseDate = value.toString();

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

    if (Number.isNaN(localChapter.chapter) || localChapter.chapter < 0) {
      setError(
        f({
          id: 'no_valid_chapter',
          defaultMessage:
            'The chapter number must be greater than or equal to 0'
        })
      );
      return;
    }
    const chapter = { ...localChapter };
    const chStubNumber = chapter.chapter + '-' + chapter.subchapter + '_';
    chapter.stub = chStubNumber + (chapter.stub === null ? '' : chapter.stub);
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
      <FormGroup>
        <Label for="releaseDate">
          {f({ id: 'release_date', defaultMessage: 'Release date' })}
        </Label>
        <div>
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
        </div>
      </FormGroup>
      <FormGroup>
        <Button id="submit_chapter" type="button" onClick={handleOnSubmit}>
          <FontAwesomeIcon icon="save" />{' '}
          {f({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </FormGroup>
    </>
  );
}

export default ChapterForm;
