import React, { memo, useState } from 'react';
import Downshift from 'downshift';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import {
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

// App Imports
import { AutocompleteList } from './CreateOrEdit/styles';
import { Button, FormGroup } from 'common/ui';
import { SEARCH_PEOPLE } from './query';
import { workRoles } from 'utils/common';

function AddPersonWorkModal({ isOpen, toggleModal, onSubmit, intl }) {
  const [person, setPerson] = useState(null);
  const [roles, setRoles] = useState(null);
  const isIncomplete = !person || person === '' || !roles || roles === '';
  const toggle = () => {
    toggleModal(!isOpen);
    setPerson(null);
    setRoles(null);
  };
  const handleOnSubmit = info => () => {
    const staff = info.roles.map(rol => {
      return {
        rol: Number(rol),
        people: {
          id: info.person.id,
          name: info.person.name
        }
      };
    });

    onSubmit(staff);
    toggleModal(false);
  };
  const onChange = e => {
    let opts = [];

    for (let i = 0, len = e.target.options.length; i < len; i++) {
      const opt = e.target.options[i];

      if (opt.selected) {
        opts.push(opt.value);
      }
    }

    setRoles(opts);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <FormattedMessage id="create_person" defaultMessage="Create Person" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Downshift
            onChange={selection => setPerson(selection)}
            itemToString={item => (item ? item.name : '')}
          >
            {({
              getInputProps,
              getItemProps,
              getLabelProps,
              getMenuProps,
              isOpen,
              inputValue,
              highlightedIndex,
              selectedItem
            }) => (
              <div style={{ position: 'relative' }}>
                <Label {...getLabelProps()}>
                  <FormattedMessage
                    id="search_person"
                    defaultMessage="Search Person"
                  />
                </Label>
                <Input {...getInputProps()} />
                <AutocompleteList {...getMenuProps()}>
                  {isOpen && inputValue ? (
                    <Query
                      query={SEARCH_PEOPLE}
                      variables={{ name: inputValue, first: 10, offset: 0 }}
                    >
                      {({ loading, error, data }) => {
                        if (loading)
                          return (
                            <div>
                              <FormattedMessage
                                id="loading"
                                defaultMessage="Loading..."
                              />
                            </div>
                          );
                        if (error) return <p>Error :(</p>;
                        if (data.searchPeopleByName.length === 0)
                          return 'NO RESULTS';

                        return (
                          <>
                            {data.searchPeopleByName.map((item, index) => (
                              <div
                                {...getItemProps({
                                  key: item.id,
                                  index,
                                  item,
                                  style: {
                                    backgroundColor:
                                      highlightedIndex === index
                                        ? 'lightgray'
                                        : 'white',
                                    fontWeight:
                                      selectedItem === item ? 'bold' : 'normal'
                                  }
                                })}
                              >
                                {item.name}
                              </div>
                            ))}
                          </>
                        );
                      }}
                    </Query>
                  ) : null}
                </AutocompleteList>
              </div>
            )}
          </Downshift>
        </FormGroup>
        <FormGroup>
          <Label for="selectRole">
            <FormattedMessage id="select_role" defaultMessage="Select roles" />
          </Label>
          <Input
            type="select"
            name="selectRole"
            id="selectRole"
            multiple
            onChange={onChange}
          >
            {workRoles.map(role => (
              <option key={`people.rol.${role.name}`} value={role.id}>
                {intl.formatMessage({
                  id: `people.rol.${role.name}`,
                  defaultMessage: role.name
                })}
              </option>
            ))}
          </Input>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={isIncomplete}
          color="primary"
          onClick={handleOnSubmit({ person, roles })}
        >
          <FormattedMessage id="create" defaultMessage="Create" />
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default memo(injectIntl(AddPersonWorkModal));
