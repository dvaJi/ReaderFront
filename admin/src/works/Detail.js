import React, { memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App Imports
import { Container, Button, ButtonLink, ButtonGroup, Table } from 'common/ui';
import WorkInfo from './WorkInfo';
import { FETCH_CHAPTERS } from './query';
import { REMOVE_CHAPTER } from './mutation';

function Detail() {
  const { formatMessage: f } = useIntl();
  const { stub, workId } = useParams();

  return (
    <Container>
      <>
        <div className="m-1">
          <ButtonLink to={'/work/manage'}>
            <FontAwesomeIcon icon="arrow-left" className="mr-1" />
            {f({ id: 'go_back', defaultMessage: 'Go back' })}
          </ButtonLink>
        </div>
        <WorkInfo stub={stub} />
        <div className="m-1 mb-2">
          <ButtonLink
            color="primary"
            className="ml-1"
            to={'/work/' + workId + '/' + stub + '/chapter/add'}
          >
            <FontAwesomeIcon icon="plus" className="mr-1" />
            {f({ id: 'create_chapter', defaultMessage: 'Create chapter' })}
          </ButtonLink>
        </div>

        <Table>
          <thead>
            <tr>
              <th>{f({ id: 'volume', defaultMessage: 'Volume' })}</th>
              <th>{f({ id: 'chapter', defaultMessage: 'Chapter' })}</th>
              <th>{f({ id: 'name', defaultMessage: 'Name' })}</th>
              <th>{f({ id: 'created_at', defaultMessage: 'Created at' })}</th>
              <th style={{ textAlign: 'center' }}>
                {f({ id: 'actions', defaultMessage: 'Actions' })}
              </th>
            </tr>
          </thead>

          <tbody>
            <ChaptersTable />
          </tbody>
        </Table>
      </>
    </Container>
  );
}

function ChaptersTable() {
  const { stub, workId } = useParams();
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(FETCH_CHAPTERS, {
    variables: { language: -1, workStub: stub }
  });
  const [removeChapter] = useMutation(REMOVE_CHAPTER);

  if (loading)
    return (
      <tr>
        <td colSpan="7">
          {f({ id: 'loading', defaultMessage: 'Loading...' })}
        </td>
      </tr>
    );
  if (error) return <p id="error_releases">Error :(</p>;
  const chapterBaseUrl = '/work/' + workId + '/' + stub + '/chapter/';
  return data.chaptersByWork.length > 0 ? (
    data.chaptersByWork
      .sort((ch1, ch2) => ch2.chapter - ch1.chapter)
      .map(({ id, name, chapter, subchapter, volume, createdAt }) => (
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

          <td>{new Date(createdAt).toDateString()}</td>

          <td style={{ textAlign: 'center' }}>
            <ButtonGroup>
              <ButtonLink
                id={'edit-' + id}
                size="sm"
                to={`/work/${workId}/${stub}/chapter/edit/${id}`}
              >
                {f({ id: 'edit', defaultMessage: 'Edit' })}
              </ButtonLink>
              <Button
                id={'remove-' + id}
                size="sm"
                onClick={async () => {
                  if (id > 0) {
                    let check = window.confirm(
                      f({
                        id: 'confirm_delete_chapter',
                        defaultMessage: 'confirm_delete_chapter'
                      })
                    );

                    if (check) {
                      await removeChapter({
                        variables: { id: id },
                        refetchQueries: [
                          {
                            query: FETCH_CHAPTERS,
                            variables: {
                              language: -1,
                              workStub: stub
                            }
                          }
                        ]
                      });
                    }
                  }
                }}
              >
                {f({ id: 'delete', defaultMessage: 'Delete' })}
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      ))
  ) : (
    <tr>
      <td colSpan="6">
        {f({
          id: 'chapters_empty',
          defaultMessage: 'Chapters empty'
        })}
      </td>
    </tr>
  );
}

export default memo(Detail);
