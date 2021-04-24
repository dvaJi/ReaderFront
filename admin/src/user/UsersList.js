import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { ModalBody } from 'reactstrap';
import { useQuery, useMutation } from '@apollo/client';

// App Imports
import {
  Container,
  Input,
  Table,
  Button,
  FormGroup,
  Label,
  Modal,
  ModalFooter,
  ModalHeader,
  Select
} from 'common/ui';
import { USERS_LIST } from './query';
import { BAN_USER, UNBAN_USER, CHANGE_ROLE } from './mutation';

function UsersList() {
  const { formatMessage: f } = useIntl();
  const [searchText, setText] = useState('');

  return (
    <Container>
      <div>
        <div style={{ margin: '10px 5px' }}>
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
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>{f({ id: 'name', defaultMessage: 'Name' })}</th>
              <th>{f({ id: 'email', defaultMessage: 'Email' })}</th>
              <th>{f({ id: 'role', defaultMessage: 'Role' })}</th>
              <th>{f({ id: 'activated', defaultMessage: 'Activated' })}</th>
              <th>{f({ id: 'banned', defaultMessage: 'Banned' })}</th>
              <th>{f({ id: 'last_login', defaultMessage: 'Last Login' })}</th>
            </tr>
          </thead>

          <tbody>
            <UsersTable searchText={searchText} />
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

function UsersTable({ searchText }) {
  const [banReason, setBanReason] = useState('');
  const [isBanOpen, setIsBanOpen] = useState(false);
  const [userSelected, setUserSelected] = useState(null);
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(USERS_LIST, {
    variables: { languages: [] }
  });

  const toggleBan = () => {
    setIsBanOpen(!isBanOpen);
  };
  const [changeRole] = useMutation(CHANGE_ROLE);
  const [banUser] = useMutation(BAN_USER);
  const [unbanUser] = useMutation(UNBAN_USER);

  if (loading)
    return (
      <tr>
        <td colSpan="7">
          {f({ id: 'loading', defaultMessage: 'Loading...' })}
        </td>
      </tr>
    );
  if (error) return <p id="error_releases">Error :(</p>;
  return (
    <>
      <Modal isOpen={isBanOpen} toggle={toggleBan}>
        <ModalHeader toggle={toggleBan}>
          {f({ id: 'ban', defaultMessage: 'Ban' })}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="banReason">
              {f({ id: 'ban_reason', defaultMessage: 'Ban Reason' })}
            </Label>
            <Input
              id="banReason"
              onChange={ev => setBanReason(ev.target.value)}
              value={banReason}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleBan}>
            {f({ id: 'cancel', defaultMessage: 'Cancel' })}
          </Button>
          <Button
            color="primary"
            onClick={async () => {
              await banUser({
                variables: { id: userSelected, reason: banReason },
                refetchQueries: [
                  {
                    query: USERS_LIST
                  }
                ]
              });
              toggleBan();
            }}
          >
            {f({ id: 'ban', defaultMessage: 'Ban' })}
          </Button>
        </ModalFooter>
      </Modal>
      {data.users.length > 0 ? (
        data.users
          .filter(user =>
            user.name.toUpperCase().startsWith(searchText.toUpperCase())
          )
          .map(({ id, name, email, role, activated, banned, lastLogin }) => (
            <tr key={id}>
              <td>
                <Link to={'/user/' + id}>{name}</Link>
              </td>

              <td>{email}</td>

              <td>
                {role === 'ADMIN' ? (
                  role
                ) : (
                  <Select
                    type="select"
                    name="select"
                    onChange={e => {
                      changeRole({
                        variables: { id, role: e.target.value },
                        refetchQueries: [
                          {
                            query: USERS_LIST
                          }
                        ]
                      });
                    }}
                    value={role}
                  >
                    <option value="UPLOADER">UPLOADER</option>
                    <option value="USER">USER</option>
                  </Select>
                )}
              </td>

              <td>
                {activated
                  ? f({ id: 'activated', defaultMessage: 'Activated' })
                  : f({ id: 'not_activated', defaultMessage: 'Not Activated' })}
              </td>

              <td>
                <Button
                  onClick={async () => {
                    if (banned) {
                      await unbanUser({
                        variables: { id },
                        refetchQueries: [
                          {
                            query: USERS_LIST
                          }
                        ]
                      });
                    } else {
                      toggleBan();
                      setUserSelected(id);
                    }
                  }}
                >
                  {banned ? 'Unban' : 'Ban'}
                </Button>
              </td>

              <td>{lastLogin}</td>
            </tr>
          ))
      ) : (
        <tr>
          <td colSpan="6">
            {f({ id: 'users_empty', defaultMessage: 'Users empty' })}
          </td>
        </tr>
      )}
    </>
  );
}

export default UsersList;
