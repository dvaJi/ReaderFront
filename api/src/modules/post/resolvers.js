import { Sequelize } from 'sequelize';
import path from 'path';
import uuidv1 from 'uuid/v1';

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
import params from '../../config/params';
import models from '../../setup/models';

const BLOG_DIR = path.join(
  __dirname,
  '..',
  '..',
  '..',
  'public',
  'images',
  'blog'
);

// Get posts
export async function getAll(
  parentValue,
  {
    language = -1,
    orderBy = 'ASC',
    sortBy = 'id',
    first = 10,
    offset = 0,
    showHidden = false
  }
) {
  const posts = await models.Post.findAll({
    ...where(showHidden, language),
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
  { categoryId, language, orderBy, first, offset, showHidden }
) {
  return await models.Post.findAll({
    ...whereCat(showHidden, { language }, { category: categoryId }),
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
  if (auth.user && auth.user.role === params.user.roles.admin) {
    uniqid = uuidv1();

    let thumbnailFilename = null;
    if (thumbnail) {
      const coverPath = path.join(BLOG_DIR, uniqid);
      const { filename } = await storeImage(thumbnail, coverPath);
      thumbnailFilename = filename;
    }

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
  if (auth.user && auth.user.role === params.user.roles.admin) {
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
      const coverPath = path.join(BLOG_DIR, postDetail.uniqid);
      const { filename } = await storeImage(thumbnail, coverPath);
      newPost.thumbnail = filename;

      // Delete old cover
      const oldCoverPath = path.join(
        BLOG_DIR,
        postDetail.uniqid,
        postDetail.thumbnail
      );
      await deleteImage(oldCoverPath);
    }

    await models.Post.update(newPost, { where: { id } });

    return { id };
  } else {
    throw new Error('Operation denied.');
  }
}

// Delete post
export async function remove(parentValue, { id }, { auth }) {
  if (auth.user && auth.user.role === params.user.roles.admin) {
    const post = await models.Post.findOne({ where: { id } });

    if (!post) {
      // Post does not exists
      throw new Error('The post does not exists.');
    } else {
      const postDetail = await post.get();
      if (postDetail.thumbnail) {
        const directory = path.join(
          BLOG_DIR,
          postDetail.uniqid,
          postDetail.thumbnail
        );
        await deleteImage(directory);
      }
      return await models.Post.destroy({ where: { id } });
    }
  } else {
    throw new Error('Operation denied.');
  }
}

// Get all posts aggregates
export async function getAggregates(
  parentValue,
  { aggregate, aggregateColumn, language, showHidden }
) {
  let agg = 0;
  await models.Post.findAll({
    ...where(showHidden, language),
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

const where = (showHidden, language) => {
  if (showHidden && (language === -1 || !language)) {
    return {};
  }

  const sHidden = showHidden ? {} : { status: 1 };
  const oLanguage = language === -1 ? {} : { language };
  return { where: { ...sHidden, ...oLanguage } };
};

const whereCat = (showHidden, language, category) => {
  if (showHidden && language === -1 && !category) {
    return {};
  }

  const sHidden = showHidden ? {} : { status: 1 };
  const oLanguage = language === -1 ? {} : { language };

  return { where: { ...sHidden, ...oLanguage, ...category } };
};

export const normalizePost = post => ({
  ...post,
  thumbnail_path: isValidThumb(post.thumbnail)
    ? `images/blog/${post.uniqid}/${post.thumbnail}`
    : 'images/default-cover.png',
  language_name: languageIdToName(post.language),
  category_name: blogCategoriesIdToName(post.category),
  status_name: postsStatusIdToName(post.status)
});
