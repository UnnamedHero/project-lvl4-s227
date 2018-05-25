import React from 'react';
import find from 'lodash/find';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import cn from 'classnames';
import connect from '../connect';
import ModalEditor from './ModalEditor';
import DeleteConfirmDialog from './DeleteConfirmDialog';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channelsList.channels,
    removeChannelState: state.requestStates.channelRemoveState,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsListEditor extends React.Component {
  static getDerivedStateFromProps(nextProps, state) {
    if ((nextProps.removeChannelState === 'requested') && state.buttonsEnabled) {
      return { buttonsEnabled: false };
    }
    if ((nextProps.removeChannelState !== 'requested') && !state.buttonsEnabled) {
      return { buttonsEnabled: true };
    }
    return null;
  }

  state = {
    innerModal: false,
    deleteModal: false,
    innerProps: {},
    deleteModalProps: {},
    buttonsEnabled: true,
  }

  addChannel = ({ modalEditorInput: name }) => {
    this.props.addChannel(name);
  }

  validateChannelName = (name) => {
    const isExists = find(this.props.channels, ch => ch.name === name);
    return isExists ? { error: 'Channel name already exist' } : null;
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
      closeOnSuccess: false,
    };
    this.setState({ innerProps: { ...addProps } });
    this.toggleInner();
  }

  toggleRenameChannel = channel => () => {
    const renameModalProps = {
      headerLabel: 'Rename channel',
      submitLabel: 'Rename',
      cancelLabel: 'Close',
      submitHandler: this.renameChannel.bind(null, channel.id),
      cancelHandler: this.toggleInner,
      validate: this.validateChannelName,
      enableReinitialize: true,
      initialValues: { modalEditorInput: channel.name },
      requestType: 'channelRenameState',
      closeOnSuccess: true,
    };
    this.setState({ innerProps: { ...renameModalProps } });
    this.toggleInner();
  }

  removeChannelDialog = channel => () => {
    const deleteModalProps = {
      okHandler: this.removeChannel(channel.id),
      cancelHandler: this.toggleDeleteConfirmModal,
      bodyText: channel.name,
    };
    this.setState({ deleteModalProps });
    this.toggleDeleteConfirmModal();
  }

  removeChannel = id => () => {
    this.props.removeChannel(id);
    this.toggleDeleteConfirmModal();
  }


  renameChannel = (id, { modalEditorInput: name }) => {
    this.props.renameChannel(id, name);
  }

  toggleInner = () => {
    this.setState({ innerModal: !this.state.innerModal });
  }

  toggleDeleteConfirmModal = () => {
    this.setState({ deleteModal: !this.state.deleteModal });
  }

  renderChannelsList() {
    const { channels } = this.props;
    return channels.map((channel) => {
      if (!channel.removable) {
        return null;
      }
      const { buttonsEnabled } = this.state;
      return (
        <li key={channel.id}>
          {channel.name}
          <ButtonGroup size="sm">
            <Button onClick={this.toggleRenameChannel(channel)} color="link" disabled={!buttonsEnabled}>rename</Button>
            <Button onClick={this.removeChannelDialog(channel)} color="link" disabled={!buttonsEnabled}>remove</Button>
          </ButtonGroup>
        </li>
      );
    });
  }

  render() {
    const { isOpen, toggle } = this.props;
    const { buttonsEnabled } = this.state;
    const deleteDialogProps = {
      isOpen: this.state.deleteModal,
      ...this.state.deleteModalProps,
    };
    const animationClass = {
      'text-info': true,
      invisible: buttonsEnabled,
    };
    return (
      <Modal isOpen={isOpen} toggle={toggle} backdrop="static">
        <ModalHeader>
          Edit channel list<span className={cn(animationClass)}>   [please, wait...]</span>
        </ModalHeader>
        <ModalBody>
          <ModalEditor isOpen={this.state.innerModal} {...this.state.innerProps} />
          <span>
            Channel list:
            <Button onClick={this.toggleAddChannel} disabled={!buttonsEnabled} color="link" size="sm">
              add
            </Button>
          </span>
          <ul className="scrollable">
            {this.renderChannelsList()}
          </ul>
          <DeleteConfirmDialog {...deleteDialogProps} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle} disabled={!buttonsEnabled}>Close</Button>
        </ModalFooter>
      </Modal>);
  }
}

export default ChannelsListEditor;
