import React, { memo, useState } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Mutation } from 'react-apollo';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// App Imports
import { Button, Input, Textarea, Label, FormGroup } from 'common/ui';
import { CREATE_PERSON } from './mutation';

function CreatePersonModal({ isOpen, toggleModal, intl }) {
  const [personName, setPersonName] = useState('');
  const [personNameKanji, setPersonNameKanji] = useState('');
  const [description, setDescription] = useState('');
  const [twitter, setTwitter] = useState('');
  const [thumbnail] = useState(null);
  const toggle = () => toggleModal(!isOpen);
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
        <FormattedMessage id="create_person" defaultMessage="Create Person" />
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>
            <FormattedMessage id="person_name" defaultMessage="Person Name" />
          </Label>
          <Input
            type="input"
            name="person-name"
            id="person-name"
            placeholder={intl.formatMessage({
              id: 'person_name',
              defaultMessage: 'Person Name'
            })}
            value={personName}
            onChange={e => setPersonName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage
              id="person_name_kanji"
              defaultMessage="Person Name Kanji"
            />
          </Label>
          <Input
            type="input"
            name="person-name-kanji"
            id="person-name-kanji"
            placeholder={intl.formatMessage({
              id: 'person_name_kanji',
              defaultMessage: 'Person Name Kanji'
            })}
            value={personNameKanji}
            onChange={e => setPersonNameKanji(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage
              id="person_twitter"
              defaultMessage="Person Twitter"
            />
          </Label>
          <Input
            type="input"
            name="person-twitter"
            id="person-twitter"
            placeholder={intl.formatMessage({
              id: 'person_twitter',
              defaultMessage: 'Person Twitter'
            })}
            value={twitter}
            onChange={e => setTwitter(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>
            <FormattedMessage
              id="person_description"
              defaultMessage="Person Description"
            />
          </Label>
          <Textarea
            type="textarea"
            name="person_description"
            id="person_description"
            placeholder={intl.formatMessage({
              id: 'person_description',
              defaultMessage: 'Person Description'
            })}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Mutation
          mutation={CREATE_PERSON}
          refetchQueries={['SearchPeopleByName']}
          variables={{
            name: personName,
            name_kanji: personNameKanji,
            description,
            twitter,
            thumbnail
          }}
          onCompleted={onCompleted}
        >
          {createPerson => (
            <Button
              disabled={isIncomplete}
              color="primary"
              onClick={createPerson}
            >
              <FormattedMessage id="create" defaultMessage="Create" />
            </Button>
          )}
        </Mutation>{' '}
        <Button color="secondary" onClick={toggle}>
          <FormattedMessage id="cancel" defaultMessage="Cancel" />
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default memo(injectIntl(CreatePersonModal));
