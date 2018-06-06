import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import isRequestFinished from './modalHelpers';

class ModalDeleteConfirm extends React.Component {
  componentDidUpdate(prevProps) {
    if (isRequestFinished(prevProps.requestState, this.props.requestState)) {
      this.props.onCloseHandler();
    }
  }

  render() {
    const {
      channelToRemove,
      onConfirmHandler,
      onCloseHandler,
      requestState,
    } = this.props;
    const reqInPropgress = requestState === 'requested';
    const bodyMessage = reqInPropgress ?
      <ModalBody>Deleting channel <span className="font-weight-bold">{channelToRemove.name}</span>. Please wait.</ModalBody> :
      <ModalBody>Are you sure to delete channel <span className="font-weight-bold">{channelToRemove.name}</span>?</ModalBody>;

    return (
      <Modal isOpen backdrop="static">
        <ModalHeader>Operation warning!</ModalHeader>
        {bodyMessage}
        <ModalFooter>
          <Button color="danger" onClick={onConfirmHandler} disabled={reqInPropgress}>Delete</Button>
          <Button color="secondary" onClick={onCloseHandler} disabled={reqInPropgress}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalDeleteConfirm;
