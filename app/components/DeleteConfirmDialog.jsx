import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const DeleteConfirmDialog = (props) => {
  const {
    isOpen,
    okHandler, cancelHandler,
    bodyText,
  } = props;
  return (
    <Modal isOpen={isOpen} toggle={cancelHandler}>
      <ModalHeader toggle={cancelHandler}>Operation warning!</ModalHeader>
      <ModalBody>Are you sure to delete channel <span className="font-weight-bold">{bodyText}</span>?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={okHandler}>Delete</Button>
        <Button color="secondary" onClick={cancelHandler}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmDialog;
