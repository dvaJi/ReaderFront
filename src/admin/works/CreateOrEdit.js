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
  Input,
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from 'reactstrap';
import { Card } from '../common/UI';

// App imports
import { renderIf, slug } from '../../utils/helpers';
import {
  createOrUpdate as workCreateOrUpdate,
  fetchWork as getWork,
  fetchWorkById as getWorkById
} from '../../work/actions/doWork';
import { upload } from '../../common/actions';
import params from '../../params';

class CreateOrEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      success: null,
      work: {
        id: 0,
        name: '',
        stub: '',
        type: '',
        hidden: false,
        adult: false,
        demographicId: 0,
        status: 0,
        statusReason: null,
        visits: 0,
        cover: null,
        works_covers: [],
        works_descriptions: []
      },
      workStatus: [],
      workTypes: [],
      demographics: [],
      langDropdownOpen: false,
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      ),
      languagesAvailables: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      )
    };

    this.handleSelectLanguage = this.handleSelectLanguage.bind(this);
    this.handleDeselectLanguage = this.handleDeselectLanguage.bind(this);
    this.toggleDescriptionsDropdown = this.toggleDescriptionsDropdown.bind(
      this
    );
  }

  componentDidMount() {
    const workStatus = Object.keys(params.works.status).map(
      k => params.works.status[k]
    );

    const demographics = Object.keys(params.genres.demographic).map(
      k => params.genres.demographic[k]
    );

    const workTypes = Object.keys(params.works.types).map(
      k => params.works.types[k]
    );

    this.setState({ workStatus, demographics, workTypes });

    this.getWork(this.props.match.params.stub);
  }

  toggleDescriptionsDropdown = () => {
    this.setState({
      langDropdownOpen: !this.state.langDropdownOpen
    });
  };

  handleSelectLanguage = lang => {
    let work = this.state.work;
    work.works_descriptions = [
      ...work.works_descriptions,
      { language: lang.id, description: '' }
    ];
    const langAvailables = this.state.languages.filter(
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
    const langAvailables = this.state.languages.filter(
      lang =>
        !work.works_descriptions.find(
          desc => desc.language === description.language
        )
    );
    this.setState({
      languagesAvailables: langAvailables,
      work: work
    });
  };

  getWork = workStub => {
    if (workStub !== undefined) {
      this.props
        .getWork(workStub)
        .then(response => {
          const langAvailables = this.state.languages.filter(
            lang =>
              !this.props.work.work.works_descriptions.find(
                desc => desc.language === lang.id
              )
          );
          this.setState({
            work: this.props.work.work,
            languagesAvailables: langAvailables
          });
        })
        .catch(error => {
          this.setState({
            error: this.context.t('error_fetching_work')
          });
        });
    }
  };

  onChange = event => {
    let work = this.state.work;
    work[event.target.name] = event.target.value;

    if (event.target.name === 'name') {
      work.stub = slug(event.target.value);
    }

    this.setState({
      work
    });
  };

  onChangeSelect = event => {
    let work = this.state.work;
    work[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    this.setState({
      work
    });
  };

  onChangeDescription = event => {
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

  onSubmit = event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    const work = Object.assign({}, this.state.work);
    work.works_descriptions = JSON.stringify(work.works_descriptions);
    delete work.works_covers;
    delete work.chapters;
    delete work.people_works;
    delete work.works_genres;
    delete work.genres;
    delete work.covers;
    delete work.description;
    delete work.createdAt;
    delete work.description;
    delete work.statusLabel;
    delete work.demographic;

    // Save work
    this.props
      .workCreateOrUpdate(work)
      .then(response => {
        this.setState({
          isLoading: false
        });

        if (response.data.errors && response.data.errors.length > 0) {
          this.setState({ error: response.data.errors[0].message });
        } else {
          this.setState({ success: this.context.t('work_saved') });

          window.setTimeout(() => {
            this.props.history.push('/admincp/work/manage');
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

  onUpload = event => {
    this.setState({ success: this.context.t('uploading_file') });

    this.setState({
      isLoading: true
    });

    let data = new FormData();
    data.append('file', event.target.files[0]);

    // Upload image
    this.props
      .upload(data)
      .then(response => {
        if (response.status === 200) {
          this.setState({ success: this.context.t('file_uploaded') });

          let work = this.state.work;
          work.cover = response.data.file;

          this.setState({
            work
          });
        } else {
          this.setState({ error: this.context.t('try_again') });
        }
      })
      .catch(error => {
        this.setState({ error: this.context.t('unknown_error') });
      })
      .then(() => {
        this.setState({
          isLoading: false
        });
      });
  };

  render() {
    return (
      <div className="container">
        <Card>
          {this.state.error && <Alert color="danger">{this.state.error}</Alert>}
          <Link to={'/admincp/work/manage'}>
            <Button>{this.context.t('go_back')}</Button>
          </Link>

          <h4>
            {this.props.match.params.id === undefined
              ? this.context.t('create')
              : this.context.t('edit')}{' '}
            {this.context.t('Work')}
          </h4>

          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="name">{this.context.t('main_name')}</Label>
              <Input
                id="name"
                type="text"
                placeholder={this.context.t('name')}
                required="required"
                name="name"
                autoComplete="off"
                value={this.state.work.name}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">{this.context.t('status')}</Label>
              <Input
                type="select"
                name="status"
                id="status"
                required="required"
                value={this.state.work.status}
                onChange={this.onChangeSelect}
              >
                {this.state.workStatus.map(st => (
                  <option key={st.id + st.name} value={st.id}>
                    {this.context.t(st.name)}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <ButtonDropdown
                isOpen={this.state.langDropdownOpen}
                toggle={this.toggleDescriptionsDropdown}
              >
                <DropdownToggle caret size="sm">
                  {this.context.t('add_language')}
                </DropdownToggle>
                <DropdownMenu>
                  {this.state.languagesAvailables.map(lang => (
                    <DropdownItem
                      key={'drop-' + lang.id}
                      onClick={e => this.handleSelectLanguage(lang)}
                    >
                      {this.context.t(lang.name + '_full')}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
              <br />
              {this.state.work.works_descriptions.map((desc, index) => {
                return (
                  <div
                    id={'textarea-' + desc.language}
                    key={'textarea-' + desc.language}
                  >
                    <Label for={'textarea-' + desc.language}>
                      {this.context.t(
                        this.state.languages.find(
                          lang => lang.id === desc.language
                        ).name + '_full'
                      )}
                    </Label>
                    <span
                      className="float-right"
                      onClick={e => this.handleDeselectLanguage(desc)}
                    >
                      {this.context.t('remove')}
                    </span>
                    <Input
                      type="textarea"
                      value={desc.description}
                      onChange={this.onChangeDescription}
                      name={'desc-' + index + '-' + desc.language}
                      id={'textarea-' + desc.language}
                    />
                  </div>
                );
              })}
            </FormGroup>
            <FormGroup>
              <Label for="type">{this.context.t('type')}</Label>
              <Input
                type="select"
                name="type"
                id="type"
                required="required"
                value={this.state.work.type}
                onChange={this.onChangeSelect}
              >
                {this.state.workTypes.map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="demographic">{this.context.t('demographic')}</Label>
              <Input
                type="select"
                name="demographicId"
                id="demographic"
                required="required"
                value={this.state.work.demographicId}
                onChange={this.onChangeSelect}
              >
                {this.state.demographics.map(st => (
                  <option key={st.id + st.name} value={st.id}>
                    {this.context.t(st.name)}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup check>
              <CustomInput
                type="checkbox"
                id="adult"
                label={this.context.t('adult')}
                value={this.state.work.adult}
              />
              <CustomInput
                type="checkbox"
                id="hidden"
                label={this.context.t('hidden')}
                value={this.state.work.hidden}
              />
            </FormGroup>

            <FormGroup>
              <Label for="uploadCover">{this.context.t('cover')}</Label>
              <CustomInput
                type="file"
                id="uploadCover"
                name="cover"
                label={this.context.t('upload_cover')}
                onChange={this.onUpload}
                required={this.state.work.id === 0}
              />
            </FormGroup>
            {renderIf(this.state.work.works_covers.length > 0, () => (
              <img
                src={`/works/${this.state.work.stub}_${
                  this.state.work.uniqid
                }/${this.state.work.works_covers[0].filename}`}
                alt={this.state.work.name}
                style={{ width: 200, marginTop: '1em' }}
              />
            ))}
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
        </Card>
      </div>
    );
  }
}

CreateOrEdit.propTypes = {
  workCreateOrUpdate: PropTypes.func.isRequired,
  getWork: PropTypes.func.isRequired,
  upload: PropTypes.func.isRequired
};

CreateOrEdit.contextTypes = {
  t: PropTypes.func.isRequired
};

function CreateOrEditState(state) {
  return {
    work: state.work
  };
}

export default withRouter(
  connect(
    CreateOrEditState,
    {
      workCreateOrUpdate,
      getWork,
      getWorkById,
      upload
    }
  )(CreateOrEdit)
);
