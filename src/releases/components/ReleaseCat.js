import React from 'react';
import { Link } from 'react-router-dom';

import { ReleaseTitle } from './styles';

export default function ReleaseCategory({ work }) {
  return (
    <Link style={{ color: 'inherit' }} to={`/work/${work.stub}`}>
      <ReleaseTitle className="pb-2 mb-0">{work.name}</ReleaseTitle>
    </Link>
  );
}
