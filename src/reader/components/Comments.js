import React from 'react';
import { useIntl } from 'react-intl';
import Lazyload from 'react-lazyload';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { Button } from 'common/ui';
import DisqusThread from '../../common/DisqusComments';

function Comments({ id, title, path, isOpen, toggle }) {
  const { formatMessage: f } = useIntl();
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggle(false)}
      size="lg"
      centered={true}
    >
      <ModalHeader toggle={() => toggle(false)}>
        {f({ id: 'comments', defaultMessage: 'Comments' })}
      </ModalHeader>
      <ModalBody>
        <Lazyload throttle={200} height={300}>
          <DisqusThread id={id} title={title} path={path} />
        </Lazyload>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => toggle(false)}>
          {f({ id: 'close', defaultMessage: 'Close' })}
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default Comments;
