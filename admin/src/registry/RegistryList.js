import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { Button, Table, Container } from 'common/ui';

export const REGISTRY_LIST = gql`
  query Registries($offset: Int) {
    registries(offset: $offset) {
      id
      username
      action
      module
      detail
      createdAt
    }
  }
`;

function RegistryList() {
  const [page, setPage] = useState(0);
  const { formatMessage: f } = useIntl();
  const { loading, data } = useQuery(REGISTRY_LIST, {
    variables: { offset: page * 50 }
  });

  if (loading) {
    return 'Loading...';
  }

  return (
    <Container>
      <h3>Registry</h3>
      <Table bordered hover>
        <tbody>
          {data.registries.length > 0 ? (
            data.registries.map(
              ({ id, username, action, module, detail, createdAt }) => (
                <tr key={id}>
                  <td>{createdAt}</td>

                  <td>{username}</td>

                  <td>{action}</td>

                  <td>{module}</td>

                  <td>{detail}</td>
                </tr>
              )
            )
          ) : (
            <tr>
              <td colSpan="6">
                {f({ id: 'registry_empty', defaultMessage: 'Registry empty' })}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div>
        <Button
          id="prev_page"
          type="button"
          className="float-left"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          {f({ id: 'previous', defaultMessage: 'Previous' })}
        </Button>
        <Button
          id="next_page"
          type="button"
          className="float-right"
          disabled={data.registries.length < 50}
          onClick={() => setPage(page + 1)}
        >
          {f({ id: 'next', defaultMessage: 'Next' })}
        </Button>
      </div>
    </Container>
  );
}

export default RegistryList;
