import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Button, CustomInput, FormGroup, Label, Input } from 'reactstrap';

// App imports
import { renderIf, slugify } from '../../../utils/helpers';
import {
  languagesAvailables,
  blogCategories,
  postsStatus,
  uploadImage
} from '../../../utils/common';
import { getImage } from '../../../common/Image';

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: props.post,
      isRecentUpload: props.post.id > 0,
      mdeState:
        props.post.id > 0
          ? RichTextEditor.createValueFromString(props.post.content, 'markdown')
          : RichTextEditor.createEmptyValue()
    };
  }

  handleMdeChange = value => {
    let post = this.state.post;
    post['content'] = value.toString('markdown');
    this.setState({ post, mdeState: value });
  };

  handleOnChange = event => {
    let post = this.state.post;
    post[event.target.name] = event.target.value;

    if (event.target.name === 'title') {
      post.stub = slugify(event.target.value);
    }

    this.setState({
      post
    });
  };

  handleOnChangeSelect = event => {
    let post = this.state.post;
    post[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    this.setState({
      post
    });
  };

  handleUploadFile = async event => {
    let data = new FormData();
    data.append('file', event.target.files[0]);

    try {
      const response = await uploadImage(data);
      const post = { ...this.state.post, thumbnail: response.data.file };
      this.setState({ isRecentUpload: true, post });
    } catch (err) {
      console.error(err);
    }
  };

  handleOnSubmit = ev => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      throw new Error('User not authenticated');
    }
    const post = Object.assign({}, this.state.post);
    post.language =
      post.language === 0 ? languagesAvailables[0].id : post.language;
    post.category = post.category === 0 ? blogCategories[0].id : post.category;
    post.status = post.status === 0 ? postsStatus[0].id : post.status;
    post.userId = user.id;
    delete post.createdAt;
    delete post.updatedAt;

    this.props.onSubmit(ev, post);
  };

  render() {
    const { intl } = this.props;
    const { post, isRecentUpload, mdeState } = this.state;
    return (
      <>
        <FormGroup>
          <Label for="title">
            <FormattedMessage id="title" defaultMessage="Title" />
          </Label>
          <Input
            id="title"
            type="text"
            placeholder={intl({
              id: 'title',
              defaultMessage: 'Title'
            })}
            required="required"
            name="title"
            autoComplete="off"
            value={post.title}
            onChange={this.handleOnChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">
            <FormattedMessage id="content" defaultMessage="Content" />
          </Label>
          <RichTextEditor value={mdeState} onChange={this.handleMdeChange} />
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
              value={post.language}
              onChange={this.handleOnChangeSelect}
            >
              {languagesAvailables.map(lang => (
                <option key={lang.id + lang.name} value={lang.id}>
                  {intl({
                    id: lang.name + '_full',
                    defaultMessage: lang.name
                  })}
                </option>
              ))}
            </Input>
          </FormGroup>
        )}
        <FormGroup>
          <Label for="status">
            <FormattedMessage id="status" defaultMessage="Status" />
          </Label>
          <Input
            type="select"
            name="status"
            id="status"
            required="required"
            value={post.status}
            onChange={this.handleOnChangeSelect}
          >
            {postsStatus.map(status => (
              <option key={status.id + status.name} value={status.id}>
                {intl({
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
            value={post.demographicId}
            onChange={this.handleOnChangeSelect}
          >
            {blogCategories.map(category => (
              <option key={category.id + category.name} value={category.id}>
                {intl({
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
            label={intl({
              id: 'upload_cover',
              defaultMessage: 'Upload cover'
            })}
            onChange={this.handleUploadFile}
            required={post.id === 0}
          />
        </FormGroup>
        {renderIf(post.thumbnail !== '' && !isRecentUpload, () => (
          <img
            id="post_thumbnail"
            src={getImage(
              `images/blog/${post.uniqid}/${post.thumbnail}`,
              250,
              250
            )}
            alt={post.title}
            style={{ width: 200, marginTop: '1em' }}
          />
        ))}
        <FormGroup>
          <Button
            id="submit_post"
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

export default PostForm;
