import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channelsList.channels,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsListEditor extends React.Component {
  // state = {
  //   innerModal: false,
  // }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle} backdrop="static">
        <ModalHeader toggle={toggle}>Edit channel list</ModalHeader>
        <ModalBody>Channel list</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>);
  }
}

export default ChannelsListEditor;
