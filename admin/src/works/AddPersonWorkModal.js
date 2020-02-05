import React, { memo, useState } from 'react';
import Downshift from 'downshift';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';
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
import worksParams from '../../../shared/params/works';

function AddPersonWorkModal({ isOpen, toggleModal, onSubmit }) {
  const [person, setPerson] = useState(null);
  const [roles, setRoles] = useState(null);
  const { formatMessage: f } = useIntl();
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
        {f({ id: 'create_person', defaultMessage: 'Create Person' })}
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
                  {f({ id: 'search_person', defaultMessage: 'Search Person' })}
                </Label>
                <Input {...getInputProps()} />
                <AutocompleteList {...getMenuProps()}>
                  {isOpen && inputValue ? (
                    <PeopleList
                      textSearch={inputValue}
                      highlightedIndex={highlightedIndex}
                      selectedItem={selectedItem}
                      getItemProps={getItemProps}
                    />
                  ) : null}
                </AutocompleteList>
              </div>
            )}
          </Downshift>
        </FormGroup>
        <FormGroup>
          <Label for="selectRole">
            {f({ id: 'select_role', defaultMessage: 'Select roles' })}
          </Label>
          <Input
            type="select"
            name="selectRole"
            id="selectRole"
            multiple
            onChange={onChange}
          >
            {Object.keys(worksParams.roles).map(role => (
              <option
                key={`people.rol.${role}`}
                value={worksParams.roles[role].id}
              >
                {f({
                  id: `people.rol.${role}`,
                  defaultMessage: role
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
          {f({ id: 'create', defaultMessage: 'Create' })}
        </Button>{' '}
        <Button color="secondary" onClick={toggle}>
          {f({ id: 'cancel', defaultMessage: 'Cancel' })}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

function PeopleList({
  textSearch,
  highlightedIndex,
  selectedItem,
  getItemProps
}) {
  const { formatMessage: f } = useIntl();
  const { loading, error, data } = useQuery(SEARCH_PEOPLE, {
    variables: { name: textSearch, first: 10, offset: 0 }
  });

  if (loading)
    return (
      <div>
        {f({
          id: 'loading',
          defaultMessage: 'Loading...'
        })}
      </div>
    );
  if (error) return <p>Error :(</p>;
  if (data.searchPeopleByName.length === 0) return 'NO RESULTS';

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
                highlightedIndex === index ? 'lightgray' : 'white',
              fontWeight: selectedItem === item ? 'bold' : 'normal'
            }
          })}
        >
          {item.name}
        </div>
      ))}
    </>
  );
}

export default memo(AddPersonWorkModal);
