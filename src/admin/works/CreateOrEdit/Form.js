import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
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
  uploadImage,
  workStatus,
  workTypes,
  genresDemographic,
  genresTypes
} from 'utils/common';
import AddPersonWorkModal from '../AddPersonWorkModal';
import Staff from './Staff';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      work: props.work,
      isAddPersonWorkModal: false,
      isRecentUpload: props.work.id > 0 ? false : true,
      languagesAvailables: toLang.filter(
        lang =>
          !props.work.works_descriptions.find(desc => desc.language === lang.id)
      ),
      langDropdownOpen: false
    };

    this.toggleAddPersonWorkModal = this.toggleAddPersonWorkModal.bind(this);
    this.assignPerson = this.assignPerson.bind(this);
    this.handleOnRemoveStaff = this.handleOnRemoveStaff.bind(this);
  }

  toggleDescriptionsDropdown = () => {
    this.setState({
      langDropdownOpen: !this.state.langDropdownOpen
    });
  };

  handleOnChange = event => {
    let work = this.state.work;
    work[event.target.name] = event.target.value;

    if (event.target.name === 'name') {
      work.stub = slugify(event.target.value);
    }

    this.setState({
      work
    });
  };

  onChangeCheckbox = event => {
    let work = this.state.work;
    work[event.target.name] = !work[event.target.name];

    this.setState({
      work
    });
  };

  onSelectGenre = event => {
    const genreIdSelected = Number(event.target.value);
    let work = this.state.work;

    if (work.works_genres.find(g => g.genreId === genreIdSelected)) {
      work.works_genres = work.works_genres.filter(
        genre => genre.genreId !== genreIdSelected
      );
    } else {
      work.works_genres.push({ genreId: genreIdSelected });
    }

    this.setState({
      work
    });
  };

  handleOnChangeSelect = event => {
    let work = this.state.work;
    work[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    this.setState({
      work
    });
  };

  handleSelectLanguage = lang => {
    let work = this.state.work;
    work.works_descriptions = [
      ...work.works_descriptions,
      { language: lang.id, description: '' }
    ];
    const langAvailables = toLang.filter(
      lang => !work.works_descriptions.find(desc => desc.language === lang.id)
    );
    this.setState({
      languagesAvailables: langAvailables,
      work: work
    });
  };

  handleDeselectLanguage = description => {
    let work = this.state.work;
    work.works_descriptions = work.works_descriptions.filter(
      wd => wd.language !== description.language
    );
    const workLanguages = work.works_descriptions.map(wd => wd.language);
    const langAvailables = toLang.filter(
      lang => !workLanguages.includes(lang.id)
    );
    this.setState({
      languagesAvailables: langAvailables,
      work: work
    });
  };

  HandleOnChangeDescription = event => {
    let work = this.state.work;
    const nameSplit = event.target.name.split('-');
    const description = event.target.value;
    work.works_descriptions[parseInt(nameSplit[1], 0)] = {
      description: description,
      language: parseInt(nameSplit[2], 0)
    };
    this.setState({
      work
    });
  };

  handleUploadFile = async event => {
    let data = new FormData();
    data.append('file', event.target.files[0]);

    try {
      const response = await uploadImage(data);
      const work = { ...this.state.work, thumbnail: response.data.file };
      this.setState({ isRecentUpload: true, work });
    } catch (err) {
      console.error(err);
    }
  };

  handleOnSubmit = ev => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      throw new Error('User not authenticated');
    }

    const work = Object.assign({}, this.state.work);
    work.works_descriptions = JSON.stringify(work.works_descriptions);
    work.type = work.type === '' ? workTypes[0] : work.type;
    work.status = work.status === 0 ? workStatus[0].id : work.status;
    work.demographicId =
      work.demographicId === 0 ? genresDemographic[0].id : work.demographicId;
    delete work.genres;
    delete work.createdAt;

    this.props.onSubmit(ev, work);
  };

  toggleAddPersonWorkModal() {
    this.setState({ isAddPersonWorkModal: !this.state.isAddPersonWorkModal });
  }

  assignPerson(staff) {
    let work = this.state.work;
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

    this.setState({
      work
    });
  }

  handleOnRemoveStaff(staff) {
    let work = this.state.work;
    work.people_works = work.people_works.filter(
      rol => !(rol.rol === staff.rol && rol.people.id === staff.id)
    );

    this.setState({
      work
    });
  }

  render() {
    const { onCreatePersonModal, intl } = this.props;
    const { work, isRecentUpload, isAddPersonWorkModal } = this.state;
    return (
      <>
        <AddPersonWorkModal
          isOpen={isAddPersonWorkModal}
          toggleModal={this.toggleAddPersonWorkModal}
          onSubmit={this.assignPerson}
        />
        <FormGroup>
          <Label for="name">
            <FormattedMessage id="main_name" defaultMessage="Main name" />
          </Label>
          <Input
            id="name"
            type="text"
            placeholder={intl.formatMessage({
              id: 'name',
              defaultMessage: 'Name'
            })}
            required="required"
            name="name"
            autoComplete="off"
            value={work.name}
            onChange={this.handleOnChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="staff" defaultMessage="Staff" />
          </Label>
          <div>
            <Button size="sm" onClick={this.toggleAddPersonWorkModal}>
              <FormattedMessage id="add_staff" defaultMessage="Add Staff" />
            </Button>
            <Button
              className="float-right"
              size="sm"
              onClick={onCreatePersonModal}
            >
              <FormattedMessage
                id="create_person"
                defaultMessage="Create Person"
              />
            </Button>
            <div>
              {work.people_works.length > 0 ? (
                <Staff
                  staff={work.people_works}
                  onRemove={this.handleOnRemoveStaff}
                />
              ) : (
                <span>
                  <FormattedMessage id="no_staff" defaultMessage="No staff" />
                </span>
              )}
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="status">
            <FormattedMessage id="status" defaultMessage="Status" />
          </Label>
          <Input
            type="select"
            name="status"
            id="status"
            required="required"
            value={work.status}
            onChange={this.handleOnChangeSelect}
          >
            {workStatus.map(st => (
              <option key={st.id + st.name} value={st.id}>
                {intl.formatMessage({
                  id: st.name,
                  defaultMessage: st.name
                })}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          {this.state.languagesAvailables.length > 0 && (
            <ButtonDropdown
              isOpen={this.state.langDropdownOpen}
              toggle={this.toggleDescriptionsDropdown}
            >
              <DropdownToggle id="add_language" caret size="sm">
                <FormattedMessage
                  id="add_language"
                  defaultMessage="Add language"
                />
              </DropdownToggle>
              <DropdownMenu>
                {this.state.languagesAvailables.map(lang => (
                  <DropdownItem
                    key={'drop-' + lang.id}
                    onClick={e => this.handleSelectLanguage(lang)}
                  >
                    <FormattedMessage
                      id={lang.name + '_full'}
                      defaultMessage={lang.name}
                    />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </ButtonDropdown>
          )}
          <br />
          {work.works_descriptions.map((desc, index) => {
            const lang = languages.find(lang => lang.id === desc.language).name;
            return (
              <div
                id={'textarea-' + desc.language}
                key={'textarea-' + desc.language}
              >
                <Label for={'textarea-' + desc.language}>
                  <FormattedMessage id={lang + '_full'} defaultMessage={lang} />
                </Label>
                <span
                  className="float-right"
                  onClick={e => this.handleDeselectLanguage(desc)}
                >
                  <FormattedMessage id="remove" defaultMessage="Remove" />
                </span>
                <Input
                  type="textarea"
                  value={desc.description}
                  onChange={this.HandleOnChangeDescription}
                  name={'desc-' + index + '-' + desc.language}
                  id={'textarea-' + desc.language}
                />
              </div>
            );
          })}
        </FormGroup>
        <FormGroup>
          <Label for="type">
            <FormattedMessage id="type" defaultMessage="Type" />
          </Label>
          <Input
            type="select"
            name="type"
            id="type"
            required="required"
            value={work.type}
            onChange={this.handleOnChangeSelect}
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
            <FormattedMessage id="demographic" defaultMessage="Demographic" />
          </Label>
          <Input
            type="select"
            name="demographicId"
            id="demographic"
            required="required"
            value={work.demographicId}
            onChange={this.handleOnChangeSelect}
          >
            {genresDemographic.map(st => (
              <option key={st.id + st.name} value={st.id}>
                {intl.formatMessage({
                  id: st.key,
                  defaultMessage: st.name
                })}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage id="genres" defaultMessage="Genres" />
          </Label>
          <GenresWrapper>
            {genresTypes.map(genre => (
              <CustomInput
                type="checkbox"
                defaultChecked={work.works_genres.find(
                  wg => wg.genreId === genre.id
                )}
                id={'genre_' + genre.name}
                name={'genre_' + genre.name}
                key={'genre_' + genre.name}
                label={intl.formatMessage({
                  id: genre.name,
                  defaultMessage: genre.name
                })}
                value={genre.id}
                onChange={this.onSelectGenre}
              />
            ))}
          </GenresWrapper>
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage
              id="additional_information"
              defaultMessage="Additional Information"
            />
          </Label>
          <CustomInput
            type="checkbox"
            id="adult"
            name="adult"
            label={intl.formatMessage({
              id: 'adult_',
              defaultMessage: 'Adult?'
            })}
            value={work.adult}
            onChange={this.onChangeCheckbox}
          />
          <CustomInput
            type="checkbox"
            id="hidden"
            name="hidden"
            label={intl.formatMessage({
              id: 'hidden',
              defaultMessage: 'Hidden'
            })}
            value={work.hidden}
            onChange={this.onChangeCheckbox}
          />
        </FormGroup>
        <FormGroup>
          <Label for="uploadCover">
            <FormattedMessage id="cover" defaultMessage="Cover" />
          </Label>
          <CustomInput
            type="file"
            id="uploadCover"
            name="cover"
            label={intl.formatMessage({
              id: 'upload_cover',
              defaultMessage: 'Upload cover'
            })}
            onChange={this.handleUploadFile}
            required={work.id === 0}
          />
        </FormGroup>
        {renderIf(
          work.thumbnail !== '' &&
            this.props.work.stub === work.stub &&
            !isRecentUpload,
          () => (
            <Image
              id="work_thumbnail"
              src={`works/${work.uniqid}/${work.thumbnail}`}
              height={200}
              width={170}
              alt={work.name}
              index={1}
            />
          )
        )}
        <FormGroup>
          <Button
            id="submit_work"
            type="button"
            theme="secondary"
            onClick={this.handleOnSubmit}
          >
            <FontAwesomeIcon className="mr-1" icon={faSave} />
            <FormattedMessage id="save" defaultMessage="Save" />
          </Button>
        </FormGroup>
      </>
    );
  }
}

export default PostForm;
