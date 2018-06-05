import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channelRemoveState: state.requestStates.channelRemoveState,
  };
  return props;
};

const DeleteConfirmDialog = (props) => {
  const {
    isOpen,
    okHandler, cancelHandler,
    bodyText,
    channelRemoveState,
  } = props;
  const reqInPropgress = channelRemoveState === 'requested';
  const bodyMessage = reqInPropgress ?
    <ModalBody>Deleting channel <span className="font-weight-bold">{bodyText}</span>. Please wait.</ModalBody> :
    <ModalBody>Are you sure to delete channel <span className="font-weight-bold">{bodyText}</span>?</ModalBody>;
  return (
    <Modal isOpen={isOpen} toggle={cancelHandler} backdrop="static">
      <ModalHeader>Operation warning!</ModalHeader>
      {bodyMessage}
      <ModalFooter>
        <Button color="danger" onClick={okHandler} disabled={reqInPropgress}>Delete</Button>
        <Button color="secondary" onClick={cancelHandler} disabled={reqInPropgress}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default connect(mapStateToProps)(DeleteConfirmDialog);
