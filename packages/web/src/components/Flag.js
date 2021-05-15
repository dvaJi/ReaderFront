import React, { memo } from 'react';
import { useIntl } from 'react-intl';

import { useGlobalState } from 'lib/state';
import { LANGUAGES } from 'lib/config';

const mapFlag = {
  es: 'flag-mx',
  en: 'flag-gb'
};

const Flag = ({ language = 'en', show = false }) => {
  const [languagesSelected] = useGlobalState('languages_filter');
  const { formatMessage: f } = useIntl();
  if (!show && (languagesSelected.length === 1 || LANGUAGES.length === 1)) {
    return null;
  }

  return (
    <span
      className={`flag ${mapFlag[language]}`}
      title={f({ id: `${language}_full`, defaultMessage: language })}
    ></span>
  );
};

export default memo(Flag);
