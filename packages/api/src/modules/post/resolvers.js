import { Sequelize, Op } from 'sequelize';
import path from 'path';
import { v1 as uuidv1 } from 'uuid';

// App Imports
import {
  deleteImage,
  storeImage,
  isValidThumb
} from '../../setup/images-helpers';
import {
  languageIdToName,
  postsStatusIdToName,
  blogCategoriesIdToName
} from '../../setup/utils';
import { hasPermission } from '../../setup/auth-utils';
import models from '../../setup/models';
import { useS3, deleteFile } from '../../setup/s3-upload';
import { addRegistry, REGISTRY_ACTIONS } from '../registry/resolvers';

const PUBLIC_PATH = path.join(__dirname, '..', '..', '..', 'public');

const BLOG_DIR = path.join('images', 'blog');

// Get posts
export async function getAll(
  parentValue,
  {
    languages = [],
    orderBy = 'ASC',
    sortBy = 'id',
    first = 10,
    offset = 0,
    showHidden = false
  }
) {
  const posts = await models.Post.findAll({
    ...where(showHidden, languages),
    order: [[sortBy, orderBy]],
    include: [{ model: models.User, as: 'user' }],
    offset: offset,
    limit: first
  }).map(el => el.get({ plain: true }));

  return posts.map(post => normalizePost(post));
}

// Get post by stub
export async function getByStub(parentValue, { stub, showHidden }) {
  const where = showHidden
    ? { where: { stub } }
    : { where: { hidden: false, stub } };
  const post = await models.Post.findOne({
    ...where,
    include: [{ model: models.User, as: 'user' }]
  });

  return normalizePost(post.toJSON());
}

// Get posts by category
export async function getByCategory(
  parentValue,
  { categoryId, languages = [], orderBy, first, offset, showHidden }
) {
  return await models.Post.findAll({
    ...whereCat(showHidden, { languages }, { category: categoryId }),
    order: [['id', orderBy]],
    include: [{ model: models.User, as: 'user' }],
    offset: offset,
    limit: first
  });
}

// Create post
export async function create(
  parentValue,
  {
    userId,
    uniqid,
    type,
    title,
    stub,
    status,
    sticky,
    content,
    category,
    language,
    thumbnail
  },
  { auth }
) {
  if (await hasPermission('create', auth)) {
    uniqid = uuidv1();

    let thumbnailFilename = null;
    if (thumbnail) {
      const postPath = path.join(BLOG_DIR, uniqid);
      const { filename } = await storeImage({
        file: thumbnail,
        basePath: PUBLIC_PATH,
        filepath: postPath
      });
      thumbnailFilename = filename;
    }

    await addRegistry(auth.user.id, REGISTRY_ACTIONS.CREATE, 'post', title);

    return await models.Post.create({
      userId,
      uniqid,
      type,
      title,
      stub,
      status,
      sticky,
      content,
      category,
      language,
      thumbnail: thumbnailFilename
    });
  } else {
    throw new Error('Operation denied.');
  }
}

// Update post
export async function update(
  parentValue,
  {
    id,
    userId,
    type,
    title,
    stub,
    status,
    sticky,
    content,
    category,
    language,
    thumbnail
  },
  { auth }
) {
  if (await hasPermission('update', auth)) {
    let newPost = {
      userId,
      type,
      title,
      stub,
      status,
      sticky,
      content,
      category,
      language
    };

    if (thumbnail) {
      const post = await models.Post.findOne({ where: { id } });
      const postDetail = await post.get();

      // Store new cover
      const postPath = path.join(BLOG_DIR, postDetail.uniqid);
      const { filename } = await storeImage({
        file: thumbnail,
        basePath: PUBLIC_PATH,
        filepath: postPath
      });

      newPost.thumbnail = filename;

      // Delete old cover
      const oldCoverPath = path.join(
        PUBLIC_PATH,
        BLOG_DIR,
        postDetail.uniqid,
        postDetail.thumbnail
      );
      try {
        await deleteImage(oldCoverPath);
        if (useS3) {
          await deleteFile(
            path.join(BLOG_DIR, postDetail.uniqid, postDetail.thumbnail)
          );
        }
      } catch (err) {
        //
      }
    }

    await addRegistry(auth.user.id, REGISTRY_ACTIONS.UPDATE, 'post', title);

    await models.Post.update(newPost, { where: { id } });

    return { id };
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete post
export async function remove(parentValue, { id }, { auth }) {
  if (await hasPermission('delete', auth)) {
    const post = await models.Post.findOne({ where: { id } });

    if (!post) {
      // Post does not exists
      throw new Error('The post does not exists.');
    } else {
      const postDetail = await post.get();
      if (postDetail.thumbnail) {
        const directory = path.join(
          PUBLIC_PATH,
          BLOG_DIR,
          postDetail.uniqid,
          postDetail.thumbnail
        );
        await deleteImage(directory);
      }

      await addRegistry(
        auth.user.id,
        REGISTRY_ACTIONS.DELETE,
        'post',
        postDetail.title
      );

      return await models.Post.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// Get all posts aggregates
export async function getAggregates(
  parentValue,
  { aggregate, aggregateColumn, languages = [], showHidden }
) {
  let agg = 0;
  await models.Post.findAll({
    ...where(showHidden, languages),
    attributes: [
      [
        Sequelize.fn(aggregate, Sequelize.col('posts.' + aggregateColumn)),
        aggregate.toLowerCase()
      ]
    ]
  }).then(async aggs => {
    if (aggs.length > 0) {
      agg = await aggs[0].get()[aggregate.toLowerCase()];
    }
  });

  const result = {};
  result[aggregate.toLowerCase()] = agg;

  return result;
}

const where = (showHidden, languages) => {
  const isAllLanguage = languages.length === 0;
  if (showHidden && isAllLanguage) {
    return {};
  }

  const sHidden = showHidden ? {} : { status: 1 };
  const oLanguage = isAllLanguage ? {} : { language: { [Op.or]: languages } };
  return { where: { ...sHidden, ...oLanguage } };
};

const whereCat = (showHidden, languages, category) => {
  const isAllLanguage = languages.length === 0;
  if (showHidden && isAllLanguage && !category) {
    return {};
  }

  const sHidden = showHidden ? {} : { status: 1 };
  const oLanguage = isAllLanguage ? {} : { language: { [Op.or]: languages } };

  return { where: { ...sHidden, ...oLanguage, ...category } };
};

export const normalizePost = post => ({
  ...post,
  thumbnail_path: isValidThumb(post.thumbnail)
    ? `/images/blog/${post.uniqid}/${post.thumbnail}`
    : '/default-cover.png',
  language_name: languageIdToName(post.language),
  category_name: blogCategoriesIdToName(post.category),
  status_name: postsStatusIdToName(post.status)
});
