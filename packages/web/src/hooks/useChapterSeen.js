/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

const LS_KEY = 'chaptersSeen';

export function useChapterSeen(chapterId) {
  let chaptersSeen = [];
  if (typeof window !== 'undefined') {
    chaptersSeen = JSON.parse(window.localStorage.getItem(LS_KEY) || '[]');
  }
  const [isSeen, setIsSeen] = useState(chaptersSeen.includes(chapterId));

  useEffect(() => {
    if (isSeen) {
      chaptersSeen = [...new Set([...chaptersSeen, chapterId])];
    } else {
      chaptersSeen = chaptersSeen.filter(chS => chS !== chapterId);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LS_KEY, JSON.stringify(chaptersSeen));
    }
  }, [isSeen, setIsSeen]);

  return { isSeen, setIsSeen };
}
