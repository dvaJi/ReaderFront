import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
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
import { renderIf, slug } from '../../utils/helpers';
import {
  createOrUpdate as postCreateOrUpdate,
  fetchPost as getPost
} from '../../blog/actions/doBlog';
import { Card } from '../common/UI';
import { upload } from '../../common/actions';
import params from '../../params';

class CreateOrEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      error: null,
      success: null,
      post: {
        id: 0,
        userId: 0,
        content: '',
        category: 0,
        uniqid: '',
        type: 0,
        title: '',
        stub: '',
        status: 0,
        sticky: false,
        language: 0,
        thumbnail: ''
      },
      postStatus: [],
      blogCategories: [],
      languages: Object.keys(params.global.languages).map(
        k => params.global.languages[k]
      ),
      mdeState: null
    };
  }

  componentDidMount() {
    const postStatus = Object.keys(params.blog.status).map(
      k => params.blog.status[k]
    );

    const blogCategories = Object.keys(params.blog.categories).map(
      k => params.blog.categories[k]
    );

    this.setState({ postStatus, blogCategories });

    this.getPost(this.props.match.params.stub);
  }

  getPost = postStub => {
    if (postStub !== undefined) {
      this.props
        .getPost(postStub)
        .then(() => {
          this.setState({
            post: this.props.blog.post
          });
        })
        .catch(error => {
          this.setState({
            error: this.props.intl.formatMessage({
              id: 'error_fetching_post',
              defaultMessage:
                'There was some error fetching post. Please try again.'
            })
          });
        });
    }
  };

  onChange = event => {
    let post = this.state.post;
    post[event.target.name] = event.target.value;

    if (event.target.name === 'name') {
      post.stub = slug(event.target.value);
    }

    this.setState({
      post
    });
  };

  handleValueChange = mdeState => {
    let post = this.state.post;
    post['content'] = mdeState.markdown;
    this.setState({ mdeState, post });
  };

  onChangeSelect = event => {
    let post = this.state.post;
    post[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    this.setState({
      post
    });
  };

  onSubmit = event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    const post = Object.assign({}, this.state.post);
    delete post.user;

    // Save post
    this.props
      .postCreateOrUpdate(post)
      .then(response => {
        this.setState({
          isLoading: false
        });

        if (response.data.errors && response.data.errors.length > 0) {
          this.setState({ error: response.data.errors[0].message });
        } else {
          this.setState({
            success: this.props.intl.formatMessage({
              id: 'post_saved',
              defaultMessage: 'Post saved successfully.'
            })
          });

          window.setTimeout(() => {
            this.props.history.push('/admincp/blog/manage');
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

  onUpload = event => {
    this.setState({
      success: this.props.intl.formatMessage({
        id: 'uploading_file',
        defaultMessage: 'Uploading file, please wait...'
      })
    });

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
          this.setState({
            success: this.props.intl.formatMessage({
              id: 'file_uploaded',
              defaultMessage: 'File uploaded successfully.'
            })
          });

          let post = this.state.post;
          post.thumbnail = response.data.file;

          this.setState({
            post
          });
        } else {
          this.setState({
            error: this.props.intl.formatMessage({
              id: 'try_again',
              defaultMessage: 'Please try again.'
            })
          });
        }
      })
      .catch(error => {
        this.setState({
          error: this.props.intl.formatMessage({
            id: 'unknown_error',
            defaultMessage: 'There was some error. Please try again.'
          })
        });
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
          <Link to={'/admincp/blog/manage'}>
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
            <FormattedMessage id="post" defaultMessage="Post" />
          </h4>

          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="title">
                <FormattedMessage id="title" defaultMessage="Title" />
              </Label>
              <Input
                id="title"
                type="text"
                placeholder={this.props.intl.formatMessage({
                  id: 'title',
                  defaultMessage: 'Title'
                })}
                required="required"
                name="title"
                autoComplete="off"
                value={this.state.post.title}
                onChange={this.onChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="content">
                <FormattedMessage id="content" defaultMessage="Content" />
              </Label>
              <ReactMde
                onChange={this.handleValueChange}
                editorState={this.state.mdeState}
                generateMarkdownPreview={markdown => (
                  <ReactMarkdown source={markdown} escapeHtml={true} />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label for="language">
                <FormattedMessage id="language" defaultMessage="Language" />
              </Label>
              <Input
                type="language"
                name="language"
                id="language"
                required="required"
                value={this.state.post.language}
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
            <FormGroup>
              <Label for="status">
                <FormattedMessage id="status" defaultMessage="Status" />
              </Label>
              <Input
                type="select"
                name="status"
                id="status"
                required="required"
                value={this.state.post.status}
                onChange={this.onChangeSelect}
              >
                {this.state.postStatus.map(status => (
                  <option key={status.id + status.name} value={status.id}>
                    {this.props.intl.formatMessage({
                      id: status.name,
                      defaultMessage: status.name
                    })}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="category">
                <FormattedMessage id="category" defaultMessage="Category" />
              </Label>
              <Input
                type="select"
                name="category"
                id="category"
                required="required"
                value={this.state.post.demographicId}
                onChange={this.onChangeSelect}
              >
                {this.state.blogCategories.map(category => (
                  <option key={category.id + category.name} value={category.id}>
                    {this.props.intl.formatMessage({
                      id: category.name,
                      defaultMessage: category.name
                    })}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="uploadCover">
                <FormattedMessage id="cover" defaultMessage="Cover" />
              </Label>
              <CustomInput
                type="file"
                id="uploadCover"
                name="cover"
                label={this.props.intl.formatMessage({
                  id: 'upload_cover',
                  defaultMessage: 'Upload cover'
                })}
                onChange={this.onUpload}
                required={this.state.post.id === 0}
              />
            </FormGroup>
            {renderIf(this.state.post.thumbnail !== '', () => (
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
                <FormattedMessage id="save" defaultMessage="Save" />
              </Button>
            </FormGroup>
          </Form>
        </Card>
      </div>
    );
  }
}

function CreateOrEditState(state) {
  return {
    post: state.post,
    user: state.user
  };
}

const connectComponent = connect(
  CreateOrEditState,
  {
    postCreateOrUpdate,
    getPost,
    upload
  }
)(CreateOrEdit);

export default injectIntl(withRouter(connectComponent));
