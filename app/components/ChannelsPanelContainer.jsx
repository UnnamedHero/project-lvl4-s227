import React from 'react';
import find from 'lodash/find';
import { getFormSyncErrors } from 'redux-form';
import ChannelsPanelHeader from './ChannelsPanelHeader';
import ChannelsList from './ChannelsList';
import ModalChannelNameEditor from './ModalChannelNameEditor';
import ModalDeleteConfirm from './ModalDeleteConfirm';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channelsList: state.channels.channelsList,
    defaultChannelId: state.channels.defaultChannelId,
    currentChannelId: state.channels.currentChannelId,
    addChannelState: state.addChannelState,
    renameChannelState: state.renameChannelState,
    removeChannelState: state.removeChannelState,
    modalInputErrors: getFormSyncErrors('ModalEditor')(state), // isValid selector do not work properly for field type validation
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsPanel extends React.Component {
  state = {
    editModeOn: false,
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

  onAddChannel = ({ modalInput: name }) => {
    this.props.addChannel(name);
  }

  onRenameChannel = ({ modalInput: newName }) => {
    this.props.renameChannel(this.state.channelToRename.id, newName);
  }

  onRemoveChannel = () => {
    this.props.removeChannel(this.state.channelToRemove.id);
  }

  setChannelToRemove = channel => () => {
    this.setState({
      removeModal: true,
      channelToRemove: channel,
    });
  }

  setChannelToRename = channel => () => {
    this.setState({
      renameModal: true,
      channelToRename: channel,
    });
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

  toggleEditMode = () => {
    this.setState({ editModeOn: !this.state.editModeOn });
  }

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  }

  validateChannelName = (name = '') => {
    const trimmedName = name.toString().trim();
    if (trimmedName.length === 0) {
      return 'Channel name cannot be blank';
    }
    const isExists = find(this.props.channelsList, ch => ch.name === trimmedName);
    if (isExists) {
      return 'Channel name already exist';
    }
    return undefined;
  }

  render() {
    const isValidInput = Object.keys(this.props.modalInputErrors).length === 0;

    const channelsPanelHeaderProps = {
      editModeOn: this.state.editModeOn,
      handleToggleEditMode: this.toggleEditMode,
      handleToggleAddModal: this.toggleAddModal,
    };

    const channelsListProps = {
      editModeOn: this.state.editModeOn,
      channelsList: this.props.channelsList,
      currentChannelId: this.props.currentChannelId,
      handleOnChannelClick: this.onChannelClick,
      onRemoveClickHandler: this.setChannelToRemove,
      onRenameClickHandler: this.setChannelToRename,
    };

    const addChannelProps = this.state.addModal &&
    {
      id: 'addChannelInput',
      submitLabel: 'Add',
      onCloseHandler: this.toggleAddModal,
      validate: this.validateChannelName,
      onSubmitHandler: this.onAddChannel,
      requestState: this.props.addChannelState,
      isValidInput,
    };

    const removeChannelProps = this.state.removeModal &&
    {
      channelToRemove: this.state.channelToRemove,
      onConfirmHandler: this.onRemoveChannel,
      onCloseHandler: this.closeRemoveModal,
      requestState: this.props.removeChannelState,
    };

    const renameChannelProps = this.state.renameModal &&
    {
      id: 'renameChannelInput',
      submitLabel: 'Rename',
      channelToRename: this.state.channelToRename,
      onSubmitHandler: this.onRenameChannel,
      validate: this.validateChannelName,
      onCloseHandler: this.closeRenameModal,
      requestState: this.props.renameChannelState,
      enableReinitialize: true,
      initialValues: { modalInput: this.state.channelToRename.name },
      isValidInput,
    };

    return (
      <div className="d-flex flex-column vh-100">
        <div className="text-white-50">
          <ChannelsPanelHeader {...channelsPanelHeaderProps} />
        </div>
        <div className="scrollable">
          <ChannelsList {...channelsListProps} />
        </div>
        { this.state.addModal && <ModalChannelNameEditor {...addChannelProps} /> }
        { this.state.renameModal && <ModalChannelNameEditor {...renameChannelProps} /> }
        { this.state.removeModal && <ModalDeleteConfirm {...removeChannelProps} /> }
      </div>
    );
  }
}

export default ChannelsPanel;
