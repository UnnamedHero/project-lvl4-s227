import React from 'react';
import find from 'lodash/find';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import connect from '../connect';
import ModalEditor from './ModalEditor';
import { getEditableChannels } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    channels: getEditableChannels(state),
    removeChannelState: state.requestStates.channelRemoveState,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsListEditor extends React.Component {
  state = {
    innerModal: false,
    innerProps: {},
  }

  addChannel = ({ modalEditorInput: name }) => {
    this.props.addChannel(name);
  }

  validateChannelName = (name) => {
    const isExists = find(this.props.channels, ch => ch.name === name);
    return isExists ? { error: 'channel name already exist' } : null;
  }

  toggleAddChannel = () => {
    const addProps = {
      headerLabel: 'Add channel',
      submitLabel: 'Add',
      cancelLabel: 'Close',
      submitHandler: this.addChannel,
      cancelHandler: this.toggleInner,
      validate: this.validateChannelName,
      enableReinitialize: true,
      initialValues: {},
      requestType: 'channelAddState',
    };
    this.setState({ innerProps: { ...addProps } });
    this.toggleInner();
  }

  toggleRenameChannel = renameModalProps => () => {
    this.setState({ innerProps: { ...renameModalProps } });
    this.toggleInner();
  }

  removeChannel = id => () => {
    this.props.removeChannel(id);
  }

  toggleInner = () => {
    this.setState({ innerModal: !this.state.innerModal });
  }

  renderChannelsList() {
    const { channels } = this.props;
    return channels.map((channel) => {
      const renameModalProps = {
        headerLabel: 'Rename channel',
        submitLabel: 'Rename',
        cancelLabel: 'Close',
        submitHandler: null,
        cancelHandler: this.toggleInner,
        validate: this.validateChannelName,
        enableReinitialize: true,
        initialValues: { modalEditorInput: channel.name },
      };
      const btnState = this.props.removeChannelState === 'requested';
      return (
        <li key={channel.id}>
          {channel.name}
          <ButtonGroup size="sm">
            <Button onClick={this.toggleRenameChannel(renameModalProps)} color="link" disabled={btnState}>rename</Button>
            <Button onClick={this.removeChannel(channel.id)} color="link" disabled={btnState}>remove</Button>
          </ButtonGroup>
        </li>
      );
    });
  }

  render() {
    const { isOpen, toggle } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={toggle} backdrop="static">
        <ModalHeader toggle={toggle}>Edit channel list</ModalHeader>
        <ModalBody>
          <ModalEditor isOpen={this.state.innerModal} {...this.state.innerProps} />
          <span>
            Channel list:
            <Button onClick={this.toggleAddChannel} color="link" size="sm">
              add
            </Button>
          </span>
          {this.renderChannelsList()}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>
        </ModalFooter>
      </Modal>);
  }
}

export default ChannelsListEditor;
