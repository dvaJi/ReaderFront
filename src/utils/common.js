// Common functions
import params from '../params.json';
import * as config from '../config';

// Return an object with styles
export function getStatusTagStyle(statusId) {
  if (statusId === params.works.status.onGoing.id) {
    return { background: '#ff982c', color: '#ffe111' };
  } else if (statusId === params.works.status.completed.id) {
    return { background: '#ff982c', color: '#ffe111' };
  } else if (statusId === params.works.status.dropped.id) {
    return { background: '#ff982c', color: '#ffe111' };
  }
}

// Get the work thumbnail url
export function getWorkThumb(dir, covers) {
  return covers
    ? `/works/${dir}/${covers.medium_thumb.filename}`
    : '/static/images/default-cover.png';
}

export function getChapterPageUrl(work, chapter, filename) {
  return `${config.READER_PATH}works/${work.stub}_${work.uniqid}/${
    chapter.chapter
  }-${chapter.subchapter}_${chapter.stub}_${chapter.uniqid}/${filename}`;
}

// Get the post thumbnail url
export function getPostThumb(dir, filename) {
  return filename
    ? `/images/blog/${dir}/${filename}`
    : '/static/images/default-cover.png';
}
