import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  CustomInput,
  FormGroup,
  Label,
  Input,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';

// App imports
import { GenresWrapper } from './styles';
import Image from 'common/Image';
import { renderIf, slugify } from 'utils/helpers';
import {
  languagesAvailables as toLang,
  languages,
  workStatus,
  workTypes,
  genresDemographic,
  genresTypes
} from 'utils/common';
import AddPersonWorkModal from '../AddPersonWorkModal';
import Staff from './Staff';

function PostForm({ work, onCreatePersonModal, onSubmit }) {
  const [localWork, setLocalWork] = useState(work);
  const [coverPic, setCoverPic] = useState(null);
  const [isAddPersonWorkModal, setIsAddPersonWorkModal] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [languagesAvailables, setLanguagesAvailables] = useState(
    toLang.filter(
      lang => !work.works_descriptions.find(desc => desc.language === lang.id)
    )
  );

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

  const handleSelectLanguage = lang => {
    let work = { ...localWork };
    work.works_descriptions = [
      ...work.works_descriptions,
      { language: lang.id, description: '' }
    ];
    const langAvailables = toLang.filter(
      lang => !work.works_descriptions.find(desc => desc.language === lang.id)
    );
    setLocalWork(work);
    setLanguagesAvailables(langAvailables);
  };

  const handleDeselectLanguage = description => {
    let work = { ...localWork };
    work.works_descriptions = work.works_descriptions.filter(
      wd => wd.language !== description.language
    );
    const workLanguages = work.works_descriptions.map(wd => wd.language);
    const langAvailables = toLang.filter(
      lang => !workLanguages.includes(lang.id)
    );

    setLocalWork(work);
    setLanguagesAvailables(langAvailables);
  };

  const HandleOnChangeDescription = event => {
    let work = { ...localWork };
    const nameSplit = event.target.name.split('-');
    const description = event.target.value;
    work.works_descriptions[parseInt(nameSplit[1], 0)] = {
      description: description,
      language: parseInt(nameSplit[2], 0)
    };
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
    work.works_descriptions = JSON.stringify(work.works_descriptions);
    work.type = work.type === '' ? workTypes[0] : work.type;
    work.status = work.status === 0 ? workStatus[0].id : work.status;
    work.demographicId =
      work.demographicId === 0 ? genresDemographic[0].id : work.demographicId;
    if (coverPic) {
      work.thumbnail = coverPic;
    }
    delete work.genres;
    delete work.createdAt;

    onSubmit(ev, work);
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
            onClick={onCreatePersonModal}
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
        <Input
          type="select"
          name="status"
          id="status"
          required="required"
          value={localWork.status}
          onChange={handleOnChangeSelect}
        >
          {workStatus.map(st => (
            <option key={st.id + st.name} value={st.id}>
              {f({
                id: st.name,
                defaultMessage: st.name
              })}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        {languagesAvailables.length > 0 && (
          <ButtonDropdown
            isOpen={langDropdownOpen}
            toggle={() => setLangDropdownOpen(!langDropdownOpen)}
          >
            <DropdownToggle id="add_language" caret size="sm">
              {f({ id: 'add_language', defaultMessage: 'Add language' })}
            </DropdownToggle>
            <DropdownMenu>
              {languagesAvailables.map(lang => (
                <DropdownItem
                  key={'drop-' + lang.id}
                  onClick={e => handleSelectLanguage(lang)}
                >
                  {f({ id: lang.name + '_full', defaultMessage: lang.name })}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </ButtonDropdown>
        )}
        <br />
        {localWork.works_descriptions.map((desc, index) => {
          const lang = languages.find(lang => lang.id === desc.language).name;
          return (
            <div
              id={'textarea-' + desc.language}
              key={'textarea-' + desc.language}
            >
              <Label for={'textarea-' + desc.language}>
                {f({ id: lang + '_full', defaultMessage: lang })}
              </Label>
              <span
                className="float-right"
                onClick={e => handleDeselectLanguage(desc)}
              >
                {f({ id: 'remove', defaultMessage: 'Remove' })}
              </span>
              <Input
                type="textarea"
                value={desc.description}
                onChange={HandleOnChangeDescription}
                name={'desc-' + index + '-' + desc.language}
                id={'textarea-' + desc.language}
              />
            </div>
          );
        })}
      </FormGroup>
      <FormGroup>
        <Label for="type">{f({ id: 'type', defaultMessage: 'Type' })}</Label>
        <Input
          type="select"
          name="type"
          id="type"
          required="required"
          value={localWork.type}
          onChange={handleOnChangeSelect}
        >
          {workTypes.map(st => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </Input>
      </FormGroup>

      <FormGroup>
        <Label for="demographic">
          {f({ id: 'demographic', defaultMessage: 'Demographic' })}
        </Label>
        <Input
          type="select"
          name="demographicId"
          id="demographic"
          required="required"
          value={localWork.demographicId}
          onChange={handleOnChangeSelect}
        >
          {genresDemographic.map(st => (
            <option key={st.id + st.name} value={st.id}>
              {f({
                id: st.key,
                defaultMessage: st.name
              })}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label>{f({ id: 'genres', defaultMessage: 'Genres' })}</Label>
        <GenresWrapper>
          {genresTypes.map(genre => (
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
          data-testid="uploadCover"
          name="cover"
          label={f({
            id: 'upload_cover',
            defaultMessage: 'Upload cover'
          })}
          onChange={handleUploadFile}
          required={localWork.id === 0}
        />
      </FormGroup>
      {renderIf(localWork.thumbnail !== '', () => (
        <Image
          id="work_thumbnail"
          data-testid="work_thumbnail"
          src={`works/${localWork.uniqid}/${localWork.thumbnail}`}
          height={200}
          width={170}
          alt={localWork.name}
          index={1}
        />
      ))}
      <FormGroup>
        <Button
          id="submit_work"
          type="button"
          theme="secondary"
          onClick={handleOnSubmit}
        >
          <FontAwesomeIcon className="mr-1" icon="save" />
          {f({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </FormGroup>
    </>
  );
}

export default PostForm;
