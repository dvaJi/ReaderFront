import React, { memo } from 'react';
import BlogContainer from './containers/BlogContainer';

export default memo(function Blog(props) {
  return (
    <div id="Blog">
      <BlogContainer {...props} />
    </div>
  );
});
