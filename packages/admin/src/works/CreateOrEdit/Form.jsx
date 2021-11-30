import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomInput, FormGroup, Label, Alert } from 'reactstrap';
import { Input, Select, Button, Textarea } from '@readerfront/ui';

import { LANGUAGES } from '../../config';
import { GenresWrapper } from './styles';
import { slugify } from '@readerfront/shared';
import { languagesAvailables } from '@readerfront/shared/build/params/global';
import { get as workGet } from '@readerfront/shared/build/params/works';
import { get as genresGet } from '@readerfront/shared/build/params/genres';
import Staff from './Staff';

import AddPersonWorkModal from '../AddPersonWorkModal';
import Image from '../../common/Image';

function PostForm({ work, onCreatePersonModal, onSubmit }) {
  const [localWork, setLocalWork] = useState(work);
  const [coverPic, setCoverPic] = useState(null);
  const [isAddPersonWorkModal, setIsAddPersonWorkModal] = useState(false);
  const [error, setError] = useState(null);

  const { formatMessage: f } = useIntl();

  const handleOnChange = event => {
    let work = { ...localWork };
    work[event.target.name] = event.target.value;

    if (event.target.name === 'name') {
      work.stub = slugify(event.target.value);
    }

    setLocalWork(work);
  };

  const onChangeCheckbox = event => {
    let work = { ...localWork };
    work[event.target.name] = !work[event.target.name];

    setLocalWork(work);
  };

  const onSelectGenre = event => {
    const genreIdSelected = Number(event.target.value);
    let work = { ...localWork };

    if (work.works_genres.find(g => g.genreId === genreIdSelected)) {
      work.works_genres = work.works_genres.filter(
        genre => genre.genreId !== genreIdSelected
      );
    } else {
      work.works_genres.push({ genreId: genreIdSelected });
    }

    setLocalWork(work);
  };

  const handleOnChangeSelect = event => {
    let work = { ...localWork };
    work[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    setLocalWork(work);
  };

  const handleUploadFile = async ({
    target: {
      validity,
      files: [file]
    }
  }) => {
    if (validity.valid) setCoverPic(file);
  };

  const handleOnSubmit = ev => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      throw new Error('User not authenticated');
    }

    const work = { ...localWork };
    if (coverPic) {
      work.thumbnail = coverPic;
    } else {
      delete work.thumbnail;
    }
    work.language = work.language || 1;
    delete work.genres;
    delete work.createdAt;
    delete work.demographic_name;
    delete work.status_name;
    delete work.staff;

    if (work.name === null || work.name === '') {
      setError('Name is required.');
    } else {
      setError(null);
      onSubmit(ev, work);
    }
  };

  const assignPerson = staff => {
    let work = { ...localWork };
    const isEqPerson = (a, c) => a.rol === c.rol && a.people.id === c.people.id;
    work.people_works = [...work.people_works, ...staff];

    if (work.people_works.length > 1) {
      work.people_works = work.people_works.reduce((map, current) => {
        if (map.length) {
          if (!map.find(mp => isEqPerson(mp, current))) {
            return [...map, current];
          }
        } else {
          if (!isEqPerson(map, current)) {
            return [map, current];
          }
        }

        return map;
      });
    }

    setLocalWork(work);
  };

  const handleOnRemoveStaff = staff => {
    let work = { ...localWork };
    work.people_works = work.people_works.filter(
      rol => !(rol.rol === staff.rol && rol.people.id === staff.id)
    );

    setLocalWork(work);
  };

  return (
    <>
      <AddPersonWorkModal
        isOpen={isAddPersonWorkModal}
        toggleModal={() => setIsAddPersonWorkModal(!isAddPersonWorkModal)}
        onSubmit={assignPerson}
      />
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="name">
          {f({ id: 'main_name', defaultMessage: 'Main name' })}
        </Label>
        <Input
          id="name"
          type="text"
          placeholder={f({
            id: 'name',
            defaultMessage: 'Name'
          })}
          required="required"
          name="name"
          autoComplete="off"
          value={localWork.name}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>{f({ id: 'staff', defaultMessage: 'Staff' })}</Label>
        <div>
          <Button
            size="sm"
            onClick={() => setIsAddPersonWorkModal(!isAddPersonWorkModal)}
          >
            {f({ id: 'add_staff', defaultMessage: 'Add Staff' })}
          </Button>
          <Button
            className="float-right"
            size="sm"
            onClick={() => onCreatePersonModal(true)}
          >
            {f({ id: 'create_person', defaultMessage: 'Create Person' })}
          </Button>
          <div>
            {localWork.people_works.length > 0 ? (
              <Staff
                staff={localWork.people_works}
                onRemove={handleOnRemoveStaff}
              />
            ) : (
              <span>{f({ id: 'no_staff', defaultMessage: 'No staff' })}</span>
            )}
          </div>
        </div>
      </FormGroup>
      <FormGroup>
        <Label for="status">
          {f({ id: 'status', defaultMessage: 'Status' })}
        </Label>
        <Select
          type="select"
          name="status"
          id="status"
          required="required"
          value={localWork.status}
          onChange={handleOnChangeSelect}
        >
          {workGet('status').map(st => (
            <option key={st.id + st.name} value={st.id}>
              {f({
                id: st.name,
                defaultMessage: st.name
              })}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label for="language">
          {f({ id: 'language', defaultMessage: 'Language' })}
        </Label>
        <Select
          type="select"
          name="language"
          id="language"
          required="required"
          value={localWork.language || 1}
          onChange={handleOnChangeSelect}
        >
          {languagesAvailables(LANGUAGES).map(lang => (
            <option key={lang.id + lang.name} value={lang.id}>
              {f({
                id: lang.name + '_full',
                defaultMessage: lang.name
              })}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label for="description">
          {f({ id: `description`, defaultMessage: 'Description' })}
        </Label>
        <Textarea
          type="textarea"
          value={localWork.description}
          onChange={handleOnChange}
          name="description"
          id="description"
        />
      </FormGroup>
      <FormGroup>
        <Label for="type">{f({ id: 'type', defaultMessage: 'Type' })}</Label>
        <Select
          type="select"
          name="type"
          id="type"
          required="required"
          value={localWork.type}
          onChange={handleOnChangeSelect}
        >
          {workGet('types').map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>
      </FormGroup>

      <FormGroup>
        <Label for="demographic">
          {f({ id: 'demographic', defaultMessage: 'Demographic' })}
        </Label>
        <Select
          type="select"
          name="demographicId"
          id="demographic"
          required="required"
          value={localWork.demographicId}
          onChange={handleOnChangeSelect}
        >
          {genresGet('demographic').map(demo => (
            <option key={demo.id + demo.name} value={demo.id}>
              {f({
                id: demo.name,
                defaultMessage: demo.name
              })}
            </option>
          ))}
        </Select>
      </FormGroup>
      <FormGroup>
        <Label>{f({ id: 'genres', defaultMessage: 'Genres' })}</Label>
        <GenresWrapper>
          {genresGet('types').map(genre => (
            <CustomInput
              type="checkbox"
              defaultChecked={localWork.works_genres.find(
                wg => wg.genreId === genre.id
              )}
              id={'genre_' + genre.name}
              name={'genre_' + genre.name}
              key={'genre_' + genre.name}
              label={f({
                id: genre.name,
                defaultMessage: genre.name
              })}
              value={genre.id}
              onChange={onSelectGenre}
            />
          ))}
        </GenresWrapper>
      </FormGroup>
      <FormGroup>
        <Label>
          {f({
            id: 'additional_information',
            defaultMessage: 'Additional Information'
          })}
        </Label>
        <CustomInput
          type="checkbox"
          id="adult"
          name="adult"
          label={f({
            id: 'adult_',
            defaultMessage: 'Adult?'
          })}
          value={localWork.adult}
          defaultChecked={localWork.adult}
          onChange={onChangeCheckbox}
        />
        <CustomInput
          type="checkbox"
          id="hidden"
          name="hidden"
          label={f({
            id: 'hidden',
            defaultMessage: 'Hidden'
          })}
          value={localWork.hidden}
          defaultChecked={localWork.hidden}
          onChange={onChangeCheckbox}
        />
        <CustomInput
          type="checkbox"
          id="licensed"
          name="licensed"
          label={f({
            id: 'licensed',
            defaultMessage: 'licensed'
          })}
          value={localWork.licensed}
          defaultChecked={localWork.licensed}
          onChange={onChangeCheckbox}
        />
      </FormGroup>
      <FormGroup>
        <Label for="uploadCover">
          {f({ id: 'cover', defaultMessage: 'Cover' })}
        </Label>
        <CustomInput
          type="file"
          id="uploadCover"
          name="cover"
          label={f({
            id: 'upload_cover',
            defaultMessage: 'Upload cover'
          })}
          onChange={handleUploadFile}
          required={localWork.id === 0}
        />
      </FormGroup>
      {localWork.thumbnail !== '' && (
        <Image
          id="work_thumbnail"
          src={`/works/${localWork.uniqid}/${localWork.thumbnail}`}
          height={200}
          width={170}
          alt={localWork.name}
          index={1}
        />
      )}
      <FormGroup>
        <Button id="submit_work" type="button" onClick={handleOnSubmit}>
          <FontAwesomeIcon className="mr-1" icon="save" />
          {f({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </FormGroup>
    </>
  );
}

export default PostForm;
