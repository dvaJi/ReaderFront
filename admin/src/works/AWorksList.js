import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery, useMutation } from '@apollo/react-hooks';

// App Imports
import {
  Container,
  ButtonLink,
  Input,
  Select,
  Table,
  Button,
  ButtonGroup
} from 'common/ui';
import { LANGUAGES } from '../config';
import { MetaTagList } from './ACPWorksMetaTags';
import { FETCH_WORKS } from './query';
import { REMOVE_WORK } from './mutation';

function List() {
  const { formatMessage: f } = useIntl();
  const [searchText, setText] = useState('');
  const [languages, setLanguages] = useState('all');

  return (
    <Container>
      <MetaTagList />
      <div>
        <div style={{ margin: '10px 5px' }}>
          <ButtonLink color="primary" to={'/work/add'}>
            <FontAwesomeIcon icon="plus" className="mr-1" />
            {f({ id: 'create_work', defaultMessage: 'Create Work' })}
          </ButtonLink>

          <Input
            type="input"
            name="search-work"
            id="search-work"
            className="float-right"
            placeholder={f({
              id: 'search_work',
              defaultMessage: 'Search...'
            })}
            value={searchText}
            onChange={e => setText(e.target.value)}
            style={{ width: 250 }}
          />
          <Select
            type="select"
            name="select"
            id="exampleSelect"
            style={{ width: 100, float: 'right', marginRight: 10 }}
            onChange={e => setLanguages(e.target.value)}
            value={languages}
          >
            <option value="all">
              {f({
                id: `all`,
                defaultMessage: 'All'
              })}
            </option>
            {LANGUAGES.map(lang => (
              <option value={lang}>
                {f({
                  id: `${lang}_full`,
                  defaultMessage: lang
                })}
              </option>
            ))}
          </Select>
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>{f({ id: 'name', defaultMessage: 'Name' })}</th>
              <th>{f({ id: 'language', defaultMessage: 'Language' })}</th>
              <th>{f({ id: 'type', defaultMessage: 'Type' })}</th>
              <th style={{ textAlign: 'center' }}>
                {f({ id: 'actions', defaultMessage: 'Actions' })}
              </th>
            </tr>
          </thead>

          <tbody>
            <WorksTable searchText={searchText} languages={languages} />
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

function WorksTable({ searchText, languages }) {
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_WORKS, {
    variables: { languages: [] }
  });
  const [removeWork] = useMutation(REMOVE_WORK);

  if (loading)
    return (
      <tr>
        <td colSpan="7">
          {f({ id: 'loading', defaultMessage: 'Loading...' })}
        </td>
      </tr>
    );
  if (error) return <p id="error_releases">Error :(</p>;
  return data.works.length > 0 ? (
    data.works
      .filter(
        work =>
          work.name.toUpperCase().startsWith(searchText.toUpperCase()) &&
          (languages === 'all' || work.language_name === languages)
      )
      .map(({ id, stub, type, language, language_name, name }) => (
        <tr key={id}>
          <td>
            <Link to={'/work/' + id + '/' + stub}>{name}</Link>
          </td>

          <td style={{ textAlign: 'center' }}>
            {language ? (
              f({ id: `${language_name}_full` })
            ) : (
              <span>
                <FontAwesomeIcon
                  id={'noDescWarn-' + id}
                  title="asdasd"
                  color="#f2a900"
                  icon="exclamation-circle"
                />
                <UncontrolledTooltip
                  placement="bottom"
                  target={'noDescWarn-' + id}
                >
                  {f({
                    id: 'work_no_lang_added',
                    defaultMessage:
                      'This work will not be displayed, please add a language'
                  })}
                </UncontrolledTooltip>
              </span>
            )}
          </td>

          <td>{type}</td>

          <td style={{ textAlign: 'center' }}>
            <ButtonGroup size="sm">
              <ButtonLink size="sm" to={'/work/edit/' + id}>
                {f({ id: 'edit', defaultMessage: 'Edit' })}
              </ButtonLink>
              <Button
                key={'delete-' + id}
                size="sm"
                onClick={async () => {
                  if (id > 0) {
                    let check = window.confirm(
                      f({
                        id: 'confirm_delete_work',
                        defaultMessage: 'Are you sure to delete this work?'
                      })
                    );

                    if (check) {
                      await removeWork({
                        variables: { id },
                        refetchQueries: [
                          {
                            query: FETCH_WORKS,
                            variables: { languages: [] }
                          }
                        ]
                      });
                    }
                  }
                }}
              >
                {f({ id: 'remove', defaultMessage: 'Remove' })}
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="6">
        {f({ id: 'works_empty', defaultMessage: 'Works empty' })}
      </td>
    </tr>
  );
}

export default List;
