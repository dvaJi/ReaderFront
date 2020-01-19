import { IntlProvider } from 'react-intl';
import { mount, shallow } from 'enzyme';

const messages = require('../i18n/locales/en'); // en.json
const defaultLocale = 'en';
const locale = defaultLocale;

export function mountWithIntl(node) {
  return mount(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  });
}

export function shallowWithIntl(node) {
  return shallow(node, {
    wrappingComponent: IntlProvider,
    wrappingComponentProps: {
      locale,
      defaultLocale,
      messages
    }
  });
}
