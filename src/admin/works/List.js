import React, { useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import {
  Input,
  Button,
  ButtonGroup,
  Container,
  Table,
  UncontrolledTooltip
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Query, graphql } from 'react-apollo';

// App Imports
import { MetaTagList } from './ACPWorksMetaTags';
import { FETCH_WORKS } from './query';
import { REMOVE_WORK } from './mutation';
import { languageIdToName } from '../../utils/common';

function List({ intl, mutate }) {
  const [searchText, setText] = useState('');
  const remove = async id => {
    if (id > 0) {
      let check = window.confirm(
        intl.formatMessage({
          id: 'confirm_delete_work',
          defaultMessage: 'Are you sure to delete this work?'
        })
      );

      if (check) {
        await mutate({
          variables: { id: id },
          refetchQueries: [
            {
              query: FETCH_WORKS
            }
          ]
        });
      }
    }
  };

  return (
    <Container>
      <MetaTagList />
      <div>
        <div style={{ margin: '10px 5px' }}>
          <Button color="primary" tag={Link} to={'/admincp/work/add'}>
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            <FormattedMessage id="add_work" defaultMessage="Add Work" />
          </Button>

          <Input
            type="input"
            name="search-work"
            id="search-work"
            className="float-right"
            placeholder={intl.formatMessage({
              id: 'search_work',
              defaultMessage: 'Search...'
            })}
            value={searchText}
            onChange={e => setText(e.target.value)}
            style={{ width: 250 }}
          />
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>
                <FormattedMessage id="name" defaultMessage="Name" />
              </th>
              <th>
                <FormattedMessage id="type" defaultMessage="Type" />
              </th>
              <th>
                <FormattedMessage id="language" defaultMessage="Language" />
              </th>
              <th>
                <FormattedMessage id="created_at" defaultMessage="Created at" />
              </th>
              <th>
                <FormattedMessage id="updated_at" defaultMessage="Updated at" />
              </th>
              <th style={{ textAlign: 'center' }}>
                <FormattedMessage id="actions" defaultMessage="Actions" />
              </th>
            </tr>
          </thead>

          <tbody>
            <Query query={FETCH_WORKS} variables={{ language: -1 }}>
              {({ loading, error, data }) => {
                if (loading)
                  return (
                    <tr>
                      <td colSpan="7">
                        <FormattedMessage
                          id="loading"
                          defaultMessage="Loading..."
                        />
                      </td>
                    </tr>
                  );
                if (error) return <p id="error_releases">Error :(</p>;
                return data.works.length > 0 ? (
                  data.works
                    .filter(work =>
                      work.name
                        .toUpperCase()
                        .startsWith(searchText.toUpperCase())
                    )
                    .map(
                      ({
                        id,
                        stub,
                        type,
                        works_descriptions,
                        name,
                        createdAt,
                        updatedAt
                      }) => (
                        <tr key={id}>
                          <td>
                            <Link to={'/admincp/work/' + id + '/' + stub}>
                              {name}
                            </Link>
                          </td>

                          <td>{type}</td>

                          <td style={{ textAlign: 'center' }}>
                            {works_descriptions.length > 0 ? (
                              works_descriptions.map((desc, i) => {
                                const comma = i !== 0 ? ', ' : '';
                                return comma + languageIdToName(desc.language);
                              })
                            ) : (
                              <span>
                                <FontAwesomeIcon
                                  id={'noDescWarn-' + id}
                                  title="asdasd"
                                  color="#f2a900"
                                  icon={faExclamationCircle}
                                />
                                <UncontrolledTooltip
                                  placement="bottom"
                                  target={'noDescWarn-' + id}
                                >
                                  <FormattedMessage
                                    id="work_no_desc_added"
                                    defaultMessage="This work will not be displayed, please add a description"
                                  />
                                </UncontrolledTooltip>
                              </span>
                            )}
                          </td>

                          <td>{new Date(createdAt).toDateString()}</td>

                          <td>{new Date(updatedAt).toDateString()}</td>

                          <td style={{ textAlign: 'center' }}>
                            <ButtonGroup size="sm">
                              <Button
                                tag={Link}
                                to={'/admincp/work/edit/' + stub}
                              >
                                <FormattedMessage
                                  id="edit"
                                  defaultMessage="Edit"
                                />
                              </Button>
                              <Button
                                key={'delete-' + id}
                                onClick={() => remove(id)}
                              >
                                <FormattedMessage
                                  id="remove"
                                  defaultMessage="Remove"
                                />
                              </Button>
                            </ButtonGroup>
                          </td>
                        </tr>
                      )
                    )
                ) : (
                  <tr>
                    <td colSpan="6">
                      <FormattedMessage
                        id="works_empty"
                        defaultMessage="Works empty"
                      />
                    </td>
                  </tr>
                );
              }}
            </Query>
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default graphql(REMOVE_WORK)(injectIntl(List));
