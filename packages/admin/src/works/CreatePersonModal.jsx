import React, { memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { useMutation } from '@apollo/client';
import { ModalBody } from 'reactstrap';

import {
  Button,
  Input,
  Textarea,
  Label,
  FormGroup,
  Modal,
  ModalFooter,
  ModalHeader
} from '@readerfront/ui';
import { CREATE_PERSON } from './mutation';

function CreatePersonModal({ isOpen, toggleModal }) {
  const [personName, setPersonName] = useState('');
  const [personNameKanji, setPersonNameKanji] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [thumbnail] = useState(null);
  const { formatMessage: f } = useIntl();
  const toggle = () => toggleModal(!isOpen);
  const [createPerson] = useMutation(CREATE_PERSON);
  const onCompleted = () => {
    toggle();
    setPersonName('');
    setPersonNameKanji('');
    setDescription('');
    setTwitter('');
  };
  const isIncomplete = !personName;

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {f({ id: 'create_person', defaultMessage: 'Create Person' })}
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            {f({ id: 'person_name', defaultMessage: 'Person Name' })}
          </Label>
          <Input
            type="input"
            name="person-name"
            id="person-name"
            placeholder={f({
              id: 'person_name',
              defaultMessage: 'Person Name'
            })}
            value={personName}
            onChange={e => setPersonName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            {f({
              id: 'person_name_kanji',
              defaultMessage: 'Person Name Kanji'
            })}
          </Label>
          <Input
            type="input"
            name="person-name-kanji"
            id="person-name-kanji"
            placeholder={f({
              id: 'person_name_kanji',
              defaultMessage: 'Person Name Kanji'
            })}
            value={personNameKanji}
            onChange={e => setPersonNameKanji(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            {f({ id: 'person_twitter', defaultMessage: 'Person Twitter' })}
          </Label>
          <Input
            type="input"
            name="person-twitter"
            id="person-twitter"
            placeholder={f({
              id: 'person_twitter',
              defaultMessage: 'Person Twitter'
            })}
            value={twitter}
            onChange={e => setTwitter(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            {f({
              id: 'person_description',
              defaultMessage: 'Person Description'
            })}
          </Label>
          <Textarea
            type="textarea"
            name="person_description"
            id="person_description"
            placeholder={f({
              id: 'person_description',
              defaultMessage: 'Person Description'
            })}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          disabled={isIncomplete}
          color="primary"
          onClick={async event => {
            event.preventDefault();
            try {
              await createPerson({
                variables: {
                  name: personName,
                  name_kanji: personNameKanji,
                  description,
                  twitter,
                  thumbnail
                },
                refetchQueries: ['SearchPeopleByName']
              });
            } catch (err) {
              alert(err);
            }

            onCompleted();
          }}
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

export default memo(CreatePersonModal);
