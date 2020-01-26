import React from 'react';
import { mountWithIntl } from 'utils/enzyme-intl';
import LangNavItem from '@components/layout/LangNavItem';
import { Nav } from 'reactstrap';

let cookieLang = 'es';

function changeLanguage(lang) {
  cookieLang = lang;
}

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <LangNavItem
      cookielang={cookieLang}
      language="es"
      onClick={e => changeLanguage('es')}
    >
      ES
    </LangNavItem>
  );
  wrapper.unmount();
});

it('should render without throwing an error', () => {
  const wrapper = mountWithIntl(
    <Nav className="ml-auto" navbar>
      <LangNavItem
        cookielang={cookieLang}
        language="es"
        onClick={e => changeLanguage('es')}
      >
        ES
      </LangNavItem>
      <LangNavItem
        cookielang={cookieLang}
        language="en"
        onClick={e => changeLanguage('en')}
      >
        EN
      </LangNavItem>
    </Nav>
  );
  wrapper
    .find('a')
    .first()
    .simulate('click');
  expect(
    wrapper
      .find('a')
      .first()
      .find('.active')
  ).toBeTruthy();
  wrapper.unmount();
});
