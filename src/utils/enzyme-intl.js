import React from 'react';
import { mount, shallow } from 'enzyme';
import { IntlProvider, intlShape } from 'react-intl';

// Create IntlProvider to retrieve React Intl context
export const initIntlProvider = (locale = 'en', messages = {}) => {
  const intlProvider = new IntlProvider({ locale, messages }, {});
  const { intl } = intlProvider.getChildContext();
  return intl;
};

// `intl` prop is required when using injectIntl HOC
const nodeWithIntlProp = (node, intl) => React.cloneElement(node, { intl });

// shallow() with React Intl context
export const shallowWithIntl = (node, intl, { context, ...options } = {}) => {
  return shallow(nodeWithIntlProp(node, intl), {
    ...options,
    context: { ...context, intl }
  });
};

// mount() with React Intl context
export const mountWithIntl = (
  node,
  intl,
  { context, childContextTypes, ...options } = {}
) => {
  return mount(nodeWithIntlProp(node, intl), {
    ...options,
    context: { ...context, intl },
    childContextTypes: {
      intl: intlShape,
      ...childContextTypes
    }
  });
};
