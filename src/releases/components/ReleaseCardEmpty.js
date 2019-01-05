import React, { memo } from 'react';

const style = { backgroundColor: '#ddd', height: 20, width: 300 };

export default memo(function ReleaseLoading() {
  const categories = [1, 2, 3];
  const rows = [1, 2, 3, 4];
  return (
    <>
      {categories.map(cat => (
        <div key={'cat-' + cat} className="my-3 p-3 bg-white rounded shadow-sm">
          <h6 className="pb-2 mb-0 show-loading-animation" style={style}>
            {' '}
          </h6>
          {rows.map(r => (
            <div key={'row-' + r} className="media text-muted pt-3">
              <svg
                className="bd-placeholder-img mr-2 rounded show-loading-animation"
                width="32"
                height="32"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
                role="img"
                aria-label="Loading"
              >
                <title>Loading</title>
                <rect fill="#ddd" width="100%" height="100%" />
                <text fill="#ddd" dy=".3em" x="50%" y="50%" />
              </svg>
              <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong
                  className="d-block text-gray-dark show-loading-animation"
                  style={{ ...style, height: 15 }}
                />
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
});
