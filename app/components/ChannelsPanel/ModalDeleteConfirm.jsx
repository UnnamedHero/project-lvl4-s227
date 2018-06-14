import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import isRequestSuccess from './modalHelpers';
import { channelType, requestStateType } from '../../types';

class ModalDeleteConfirm extends React.Component {
  static propTypes = {
    channelToRemove: channelType.isRequired,
    onConfirmHandler: PropTypes.func.isRequired,
    onCloseHandler: PropTypes.func.isRequired,
    requestState: requestStateType.isRequired,
  }

  componentDidUpdate(prevProps) {
    if (isRequestSuccess(prevProps.requestState, this.props.requestState)) {
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
    const isRequestPending = requestState === 'requested';
    const modalBody = isRequestPending ?
      <ModalBody>Deleting channel <span className="font-weight-bold">{channelToRemove.name}</span>. Please wait.</ModalBody> :
      <ModalBody>Are you sure to delete channel <span className="font-weight-bold">{channelToRemove.name}</span>?</ModalBody>;

    return (
      <Modal isOpen backdrop="static">
        <ModalHeader>Operation warning!</ModalHeader>
        {modalBody}
        <ModalFooter>
          <Button color="danger" onClick={onConfirmHandler} disabled={isRequestPending}>Delete</Button>
          <Button color="secondary" onClick={onCloseHandler} disabled={isRequestPending}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalDeleteConfirm;
