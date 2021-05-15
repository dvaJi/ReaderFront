import React from 'react';
import { createIntl, RawIntlProvider } from 'react-intl';

import { useGlobalState } from 'lib/state';

function ConnectedIntl({ locale, messages, cache, children }) {
  const [language] = useGlobalState('language');
  const intl = createIntl(
    {
      locale: language || locale,
      messages
    },
    cache
  );
  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
}

export default ConnectedIntl;
