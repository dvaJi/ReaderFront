import React, { useState } from 'react';
import RichTextEditor from 'react-rte';
import { useIntl } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, CustomInput, FormGroup, Label, Input } from 'reactstrap';

// App imports
import { LANGUAGES } from '../../config';
import { slugify } from '@readerfront/shared';
import { languagesAvailables } from '@readerfront/shared/build/params/global';
import { get as blogGet } from '@readerfront/shared/build/params/blog';
import { getImage } from '../../common/Image';

function PostForm({ post, onSubmit }) {
  const [localPost, setLocalPost] = useState(post);
  const [coverPic, setCoverPic] = useState(null);
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
    const post = { ...localPost };
    post.userId = user.id;
    if (coverPic) {
      post.thumbnail = coverPic;
    } else {
      delete post.thumbnail;
    }
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
      {languagesAvailables(LANGUAGES).length > 1 && (
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
            {languagesAvailables(LANGUAGES).map(lang => (
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
          {blogGet('status').map(status => (
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
          {blogGet('categories').map(category => (
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
          name="cover"
          label={f({
            id: 'upload_cover',
            defaultMessage: 'Upload cover'
          })}
          onChange={handleUploadFile}
          required={localPost.id === 0}
          multiple
        />
      </FormGroup>
      {localPost.thumbnail !== '' && (
        <img
          id="post_thumbnail"
          src={getImage(
            `/images/blog/${localPost.uniqid}/${localPost.thumbnail}`,
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
          <FontAwesomeIcon icon="save" />{' '}
          {f({ id: 'save', defaultMessage: 'Save' })}
        </Button>
      </FormGroup>
    </>
  );
}

export default PostForm;
