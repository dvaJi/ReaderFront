import params from '../params.json';

export function normalizePost(post) {
  const categoryLabel = Object.keys(params.blog.categories).find(
    st => params.blog.categories[st].id === post.category
  );

  return {
    ...post,
    categoryLabel
  };
}
