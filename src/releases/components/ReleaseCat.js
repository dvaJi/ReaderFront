import React from 'react';
import { Link } from 'react-router-dom';

export default function ReleaseCategory({ work }) {
  return (
    <Link to={`/work/${work.stub}`}>
      <h6 className="border-bottom border-gray pb-2 mb-0">{work.name}</h6>
    </Link>
  );
}
