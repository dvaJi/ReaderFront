// Common functions
import params from '../params.json';

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

// Get the thumbnail url
export function getWorkThumb(dir, covers) {
  return covers
    ? `/works/${dir}/${covers.medium_thumb.filename}`
    : '/static/images/default-cover.png';
}

/* HELPERS TO NORMALIZE DATA */

export function normalizeCovers(work) {
  if (work.works_covers.length === 0) {
    return null;
  }

  let covers = {};
  const coversTypesKeys = Object.keys(params.works.cover_type);
  coversTypesKeys
    .filter(ctk =>
      work.works_covers.find(
        wc => wc.coverTypeId === params.works.cover_type[ctk].id
      )
    )
    .forEach(ctk => {
      covers = {
        ...covers,
        [ctk]: work.works_covers.find(
          wc => wc.coverTypeId === params.works.cover_type[ctk].id
        )
      };
    });

  return covers;
}
