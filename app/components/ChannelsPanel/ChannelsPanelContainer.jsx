import React from 'react';
import find from 'lodash/find';
import { SubmissionError } from 'redux-form';
import PropTypes from 'prop-types';
import ChannelsPanelHeader from './ChannelsPanelHeader';
import ChannelsList from './ChannelsList';
import ModalChannelNameEditor from './ModalChannelNameEditor';
import ModalDeleteConfirm from './ModalDeleteConfirm';
import connect from '../../connect';
import { channelsListType, requestStateType } from '../../types';

const mapStateToProps = (state) => {
  const props = {
    channelsList: state.channels.channelsList,
    currentChannelId: state.channels.currentChannelId,
    addChannelState: state.addChannelState,
    renameChannelState: state.renameChannelState,
    removeChannelState: state.removeChannelState,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsPanelContainer extends React.Component {
  static propTypes = {
    channelsList: channelsListType.isRequired,
    currentChannelId: PropTypes.number.isRequired,
    addChannelState: requestStateType.isRequired,
    renameChannelState: requestStateType.isRequired,
    removeChannelState: requestStateType.isRequired,
    changeCurrentChannel: PropTypes.func.isRequired,
    addChannelRequest: PropTypes.func.isRequired,
    renameChannelRequest: PropTypes.func.isRequired,
    removeChannelRequest: PropTypes.func.isRequired,
  }

  state = {
    addModal: false,
    removeModal: false,
    renameModal: false,
    channelToRename: {},
    channelToRemove: {},
  };

  onChannelClick = id => () => {
    const { currentChannelId, changeCurrentChannel } = this.props;
    if (currentChannelId === id) {
      return;
    }
    changeCurrentChannel({ id });
  }

  onRemoveChannel = () => {
    this.props.removeChannelRequest(this.state.channelToRemove.id);
  }

  setChannelToRemove = channel => (event) => {
    event.stopPropagation();
    this.setState({
      removeModal: true,
      channelToRemove: channel,
    });
  }

  setChannelToRename = channel => (event) => {
    event.stopPropagation();
    this.setState({
      renameModal: true,
      channelToRename: channel,
    });
  }

  renameChannel = (newName) => {
    this.props.renameChannelRequest(this.state.channelToRename.id, newName);
  }

  closeRemoveModal = () => {
    this.setState({
      removeModal: false,
      channelToRemove: {},
    });
  }

  closeRenameModal = () => {
    this.setState({
      renameModal: false,
      channelToRename: {},
    });
  }

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  }

  validateChannelName = (submitAction, { modalInput: name = '' }) => {
    const trimmedName = name.toString().trim();
    if (trimmedName.length === 0) {
      throw new SubmissionError({ modalInput: 'Channel name cannot be blank' });
    }

    if (name !== trimmedName) {
      throw new SubmissionError({ modalInput: 'Channel name cannot contain whitespaces on both ends' });
    }

    const isNameExists = find(this.props.channelsList, ch => ch.name === trimmedName);
    if (isNameExists) {
      throw new SubmissionError({ modalInput: 'Channel name already exist' });
    }

    submitAction(name);
  }

  submitAddChannel = this.validateChannelName.bind(null, this.props.addChannelRequest);
  submitRenameChannel = this.validateChannelName.bind(null, this.renameChannel);

  makeAddChannelProps() {
    return {
      id: 'addChannelInput',
      submitLabel: 'Add',
      onCloseHandler: this.toggleAddModal,
      onSubmit: this.submitAddChannel,
      requestState: this.props.addChannelState,
    };
  }

  makeRenameChannelProps() {
    return {
      id: 'renameChannelInput',
      submitLabel: 'Rename',
      channelToRename: this.state.channelToRename,
      onSubmit: this.submitRenameChannel,
      onCloseHandler: this.closeRenameModal,
      requestState: this.props.renameChannelState,
      enableReinitialize: true,
      initialValues: { modalInput: this.state.channelToRename.name },
    };
  }

  makeRemoveChannelProps() {
    return {
      channelToRemove: this.state.channelToRemove,
      onConfirmHandler: this.onRemoveChannel,
      onCloseHandler: this.closeRemoveModal,
      requestState: this.props.removeChannelState,
    };
  }

  makeChannelsListProps() {
    return {
      channelsList: this.props.channelsList,
      currentChannelId: this.props.currentChannelId,
      handleOnChannelClick: this.onChannelClick,
      onRemoveClickHandler: this.setChannelToRemove,
      onRenameClickHandler: this.setChannelToRename,
    };
  }
  makeChannelsPanelHeaderProps() {
    return {
      handleToggleAddModal: this.toggleAddModal,
    };
  }

  render() {
    return (
      <div className="d-flex flex-column vh-100">
        <div className="text-white-50 m-2">
          <ChannelsPanelHeader {...this.makeChannelsPanelHeaderProps()} />
        </div>
        <div className="scrollable mb-2">
          <ChannelsList {...this.makeChannelsListProps()} />
        </div>
        { this.state.addModal && <ModalChannelNameEditor {...this.makeAddChannelProps()} /> }
        { this.state.renameModal && <ModalChannelNameEditor {...this.makeRenameChannelProps()} /> }
        { this.state.removeModal && <ModalDeleteConfirm {...this.makeRemoveChannelProps()} /> }
      </div>
    );
  }
}

export default ChannelsPanelContainer;
