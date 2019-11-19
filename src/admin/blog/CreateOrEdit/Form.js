import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Button, CustomInput, FormGroup, Label, Input } from 'reactstrap';

// App imports
import { slugify } from 'utils/helpers';
import {
  languagesAvailables,
  blogCategories,
  postsStatus,
  uploadImage
} from 'utils/common';
import { getImage } from 'common/Image';

function PostForm({ post, onSubmit }) {
  const [localPost, setLocalPost] = useState(post);
  const [mdeState, setMdeState] = useState(
    post.id > 0
      ? RichTextEditor.createValueFromString(post.content, 'markdown')
      : RichTextEditor.createEmptyValue()
  );
  const { formatMessage: f } = useIntl();

  const handleMdeChange = value => {
    let post = { ...localPost };
    post['content'] = value.toString('markdown');
    setLocalPost(post);
    setMdeState(value);
  };

  const handleOnChange = event => {
    let post = { ...localPost };
    post[event.target.name] = event.target.value;

    if (event.target.name === 'title') {
      post.stub = slugify(event.target.value);
    }

    setLocalPost(post);
  };

  const handleOnChangeSelect = event => {
    let post = { ...localPost };
    post[event.target.name] = isNaN(event.target.value)
      ? event.target.value
      : parseInt(event.target.value, 0);
    setLocalPost(post);
  };

  const handleUploadFile = async event => {
    let data = new FormData();
    data.append('file', event.target.files[0]);

    try {
      const response = await uploadImage(data);
      const post = { ...localPost, thumbnail: response.data.file };
      setLocalPost(post);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnSubmit = ev => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (!user) {
      throw new Error('User not authenticated');
    }
    const post = { ...localPost };
    post.language =
      post.language === 0 ? languagesAvailables[0].id : post.language;
    post.category = post.category === 0 ? blogCategories[0].id : post.category;
    post.status = post.status === 0 ? postsStatus[0].id : post.status;
    post.userId = user.id;
    delete post.createdAt;
    delete post.updatedAt;

    onSubmit(ev, post);
  };

  return (
    <>
      <FormGroup>
        <Label for="title">{f({ id: 'title', defaultMessage: 'Title' })}</Label>
        <Input
          id="title"
          type="text"
          placeholder={f({
            id: 'title',
            defaultMessage: 'Title'
          })}
          required="required"
          name="title"
          autoComplete="off"
          value={localPost.title}
          onChange={handleOnChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="content">
          {f({ id: 'content', defaultMessage: 'Content' })}
        </Label>
        <RichTextEditor value={mdeState} onChange={handleMdeChange} />
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
            value={localPost.language}
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
        <Label for="status">
          {f({ id: 'status', defaultMessage: 'Status' })}
        </Label>
        <Input
          type="select"
          name="status"
          id="status"
          required="required"
          value={localPost.status}
          onChange={handleOnChangeSelect}
        >
          {postsStatus.map(status => (
            <option key={status.id + status.name} value={status.id}>
              {f({
                id: status.name,
                defaultMessage: status.name
              })}
            </option>
          ))}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="category">
          {f({ id: 'category', defaultMessage: 'Category' })}
        </Label>
        <Input
          type="select"
          name="category"
          id="category"
          required="required"
          value={localPost.demographicId}
          onChange={handleOnChangeSelect}
        >
          {blogCategories.map(category => (
            <option key={category.id + category.name} value={category.id}>
              {f({
                id: category.name,
                defaultMessage: category.name
              })}
            </option>
          ))}
        </Input>
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
          required={localPost.id === 0}
        />
      </FormGroup>
      {localPost.thumbnail !== '' && (
        <img
          id="post_thumbnail"
          data-testid="post_thumbnail"
          src={getImage(
            `images/blog/${localPost.uniqid}/${localPost.thumbnail}`,
            250,
            250
          )}
          alt={localPost.title}
          style={{ width: 200, marginTop: '1em' }}
        />
      )}
      <FormGroup>
        <Button
          id="submit_post"
          type="button"
          theme="secondary"
          onClick={handleOnSubmit}
        >
          <FontAwesomeIcon icon={faSave} />{' '}
          {f({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </FormGroup>
    </>
  );
}

export default PostForm;
