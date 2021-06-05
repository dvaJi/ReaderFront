/* eslint-disable react-hooks/exhaustive-deps */
import { formatDistance } from 'date-fns';
import { getLocale } from 'lib/datefnsLocale';
import { useGlobalState } from 'lib/state';
import { useState, useEffect } from 'react';

export function useDistanceDate(date) {
  const [language] = useGlobalState('language');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    try {
      const diffDays = formatDistance(new Date(date), new Date(), {
        addSuffix: true,
        locale: getLocale(language)
      });
      setDistance(diffDays);
    } catch (err) {
      setDistance('');
    }
  }, [language]);

  return distance;
}
