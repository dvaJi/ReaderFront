import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Query, graphql } from 'react-apollo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

// App Imports
import { Container, Button, ButtonLink, ButtonGroup, Table } from 'common/ui';
import WorkInfo from './WorkInfo';
import { FETCH_CHAPTERS } from './query';
import { REMOVE_CHAPTER } from './mutation';
import { languageIdToName } from 'utils/common';

function Detail({ intl, match, mutate }) {
  const remove = async id => {
    if (id > 0) {
      let check = window.confirm(
        intl.formatMessage({
          id: 'confirm_delete_chapter',
          defaultMessage: 'confirm_delete_chapter'
        })
      );

      if (check) {
        await mutate({
          variables: { id: id },
          refetchQueries: [
            {
              query: FETCH_CHAPTERS,
              variables: {
                language: -1,
                workStub: match.params.stub
              }
            }
          ]
        });
      }
    }
  };

  return (
    <Container>
      <>
        <WorkInfo stub={match.params.stub} />

        <div className="m-1 mb-2">
          <ButtonLink to={'/admincp/work/manage'}>
            <FontAwesomeIcon icon={faArrowLeft} className="mr-1" />
            <FormattedMessage id="go_back" defaultMessage="Go back" />
          </ButtonLink>
          <ButtonLink
            color="primary"
            className="ml-1"
            to={
              '/admincp/work/' +
              match.params.workId +
              '/' +
              match.params.stub +
              '/chapter/add'
            }
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            <FormattedMessage id="add_chapter" defaultMessage="Add chapter" />
          </ButtonLink>
        </div>

        <Table>
          <thead>
            <tr>
              <th>
                <FormattedMessage id="volume" defaultMessage="Volume" />
              </th>
              <th>
                <FormattedMessage id="chapter" defaultMessage="Chapter" />
              </th>
              <th>
                <FormattedMessage id="name" defaultMessage="Name" />
              </th>
              <th>
                <FormattedMessage id="language" defaultMessage="Language" />
              </th>
              <th>
                <FormattedMessage id="created_at" defaultMessage="Created at" />
              </th>
              <th style={{ textAlign: 'center' }}>
                <FormattedMessage id="actions" defaultMessage="Actions" />
              </th>
            </tr>
          </thead>

          <tbody>
            <Query
              query={FETCH_CHAPTERS}
              variables={{
                language: -1,
                workStub: match.params.stub
              }}
            >
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
                const chapterBaseUrl =
                  '/admincp/work/' +
                  match.params.workId +
                  '/' +
                  match.params.stub +
                  '/chapter/';
                return data.chaptersByWork.length > 0 ? (
                  data.chaptersByWork
                    .sort((ch1, ch2) => ch2.chapter - ch1.chapter)
                    .map(
                      ({
                        id,
                        name,
                        chapter,
                        subchapter,
                        volume,
                        language,
                        createdAt
                      }) => (
                        <tr key={id}>
                          <td>{volume}</td>
                          <td>
                            <Link to={chapterBaseUrl + id}>
                              {chapter}.{subchapter}
                            </Link>
                          </td>

                          <td>
                            <Link to={chapterBaseUrl + id}>{name}</Link>
                          </td>

                          <td style={{ textAlign: 'center' }}>
                            {languageIdToName(language)}
                          </td>

                          <td>{new Date(createdAt).toDateString()}</td>

                          <td style={{ textAlign: 'center' }}>
                            <ButtonGroup>
                              <ButtonLink
                                id={'edit-' + id}
                                size="sm"
                                to={
                                  '/admincp/work/' +
                                  match.params.workId +
                                  '/' +
                                  match.params.stub +
                                  '/chapter/edit/' +
                                  id
                                }
                              >
                                <FormattedMessage
                                  id="edit"
                                  defaultMessage="Edit"
                                />
                              </ButtonLink>
                              <Button
                                id={'remove-' + id}
                                size="sm"
                                onClick={() => remove(id)}
                              >
                                <FormattedMessage
                                  id="delete"
                                  defaultMessage="Delete"
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
                        id="chapters_empty"
                        defaultMessage="Chapters empty"
                      />
                    </td>
                  </tr>
                );
              }}
            </Query>
          </tbody>
        </Table>
      </>
    </Container>
  );
}

export default graphql(REMOVE_CHAPTER)(memo(injectIntl(Detail)));
