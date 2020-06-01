import React from 'react';
import { useIntl } from 'react-intl';
import { ModalBody } from 'reactstrap';

import { LANGUAGES } from 'lib/config';
import {
  useGlobalState,
  setTheme,
  setLanguage,
  setLanguagesFilter
} from 'lib/state';
import {
  Button,
  Container,
  Select,
  MultiSelect,
  Modal,
  ModalHeader,
  ModalFooter
} from '../ui';
import { languagesAvailables } from '@shared/params/global';

function AppSettings({ isOpen, toggle }) {
  const [themeSelected] = useGlobalState('theme');
  const [languagesSelected] = useGlobalState('languages_filter');
  const { formatMessage: f, locale } = useIntl();

  const langsOptions = languagesAvailables(LANGUAGES).map(lang => ({
    label: f({ id: `${lang.name}_full`, defaultMessage: lang.name }),
    value: lang.id
  }));

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      size="md"
      centered={true}
    >
      <ModalHeader toggle={() => toggle(false)}>
        {f({ id: 'app_settings', defaultMessage: 'App Settings' })}
      </ModalHeader>
      <ModalBody>
        <Container>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {f({ id: 'site_theme', defaultMessage: 'Site Theme' })}
            </label>
            <div className="col">
              <div className="row">
                <Button
                  active={themeSelected === 'light'}
                  onClick={() => setTheme('light')}
                  className="col px-2"
                >
                  {f({ id: 'light', defaultMessage: 'Light' })}
                </Button>
                <Button
                  active={themeSelected === 'dark'}
                  onClick={() => setTheme('dark')}
                  className="col px-2"
                >
                  {f({ id: 'dark', defaultMessage: 'Dark' })}
                </Button>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {f({
                id: 'user_interface_language',
                defaultMessage: 'User interface language'
              })}
            </label>
            <div className="col">
              <div className="row">
                <Select
                  type="select"
                  name="language"
                  id="language"
                  required="required"
                  value={locale}
                  onChange={ev => setLanguage(ev.target.value)}
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang} value={lang}>
                      {f({
                        id: lang + '_full',
                        defaultMessage: lang
                      })}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">
              {f({
                id: 'filter_chapter_languages',
                defaultMessage: 'Filter chapter languages'
              })}
            </label>
            <div className="col">
              <div className="row">
                <MultiSelect
                  options={langsOptions}
                  value={languagesSelected}
                  onChange={setLanguagesFilter}
                  labelledBy={'Select'}
                />
              </div>
            </div>
          </div>
        </Container>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>
          {f({ id: 'close', defaultMessage: 'Close' })}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default AppSettings;
