import React, { memo } from 'react';
import Link from 'next/link';
import theme from 'styled-theming';
import styled from 'styled-components';

import getImage from '@components/Image/function';
import Flag from '@components/Flag';

import { theme as rfTheme } from '@readerfront/ui';
const { background, toRgb } = rfTheme;

const shadowColor = theme('mode', {
  light: toRgb(background.light.darkest),
  dark: toRgb(background.dark.lighter)
});

const ListItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border-radius: 0.25rem;
`;

const Media = styled.div`
  position: relative;
  display: block;
  padding: 0;
  flex-shrink: 0;
  border-radius: inherit;
  transition: box-shadow 0.15s linear;

  &:hover {
    box-shadow: 0 0 20px rgba(${shadowColor}, 0.5);
  }

  &:after {
    content: '';
    display: block;
    padding-top: 120%;
  }
`;

const MediaContent = styled.a`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border: 0;
  border-radius: inherit;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-color: hsla(0, 0%, 47.1%, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MediaOverlay = styled.div`
  position: absolute;
  top: ${({ top }) => (top ? '0' : 'auto')};
  left: 0;
  right: 0;
  bottom: ${({ bottom }) => (bottom ? '0' : 'auto')};
  padding: 1rem;
  z-index: 2;
  display: flex;
  align-items: center;
  color: #fff;
`;

const Badge = styled.div`
  padding: 0.3em 0.45em;
  margin-right: 5px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.51);

  & > .status {
    line-height: 2em;
  }
`;

const ListContent = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  justify-content: center;
`;

const ListBody = styled.div`
  flex: 1 1 auto;
`;

const ListTitle = styled.a`
  line-height: 1.4285714286;
  font-weight: 500;
  display: block;
  color: inherit;
  cursor: pointer;
`;

const getThumbSize = size => {
  if (size === 'small') {
    return { height: 230, width: 190 };
  } else {
    return { height: 370, width: 300 };
  }
};

function WorkItem({ work, size }) {
  const thumbSize = getThumbSize(size);
  const thumbnail = getImage(
    work.thumbnail_path,
    thumbSize.height,
    thumbSize.width,
    work.id,
    true
  );
  return (
    <div className="col-6 col-md-4 col-xl-3">
      <ListItem>
        <Media className="media">
          <Link
            href="/work/[lang]/[slug]"
            as={`/work/${work.language_name}/${work.stub}`}
            passHref
          >
            <MediaContent
              className="media-content"
              style={{
                backgroundImage: `url('${thumbnail}')`
              }}
            />
          </Link>
          <MediaOverlay top className="justify-content-end">
            {work.adult && (
              <Badge className="badge text-uppercase">
                <span className="status">+18</span>
              </Badge>
            )}
          </MediaOverlay>
          <MediaOverlay bottom className="justify-content-end">
            <Badge className="badge text-uppercase">
              <Flag language={work.language_name} />
            </Badge>
          </MediaOverlay>
        </Media>
        <ListContent>
          <ListBody>
            <Link
              href="/work/[lang]/[slug]"
              as={`/work/${work.language_name}/${work.stub}`}
              passHref
            >
              <ListTitle>{work.name}</ListTitle>
            </Link>
          </ListBody>
        </ListContent>
      </ListItem>
    </div>
  );
}

export default memo(WorkItem);
