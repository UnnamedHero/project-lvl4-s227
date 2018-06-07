import React from 'react';
import find from 'lodash/find';
import { getFormSyncErrors } from 'redux-form';
import PropTypes from 'prop-types';
import ChannelsPanelHeader from './ChannelsPanelHeader';
import ChannelsList from './ChannelsList';
import ModalChannelNameEditor from './ModalChannelNameEditor';
import ModalDeleteConfirm from './ModalDeleteConfirm';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    channelsList: state.channels.channelsList,
    currentChannelId: state.channels.currentChannelId,
    addChannelState: state.addChannelState,
    renameChannelState: state.renameChannelState,
    removeChannelState: state.removeChannelState,
    modalInputErrors: getFormSyncErrors('ModalEditor')(state), // isValid selector do not work properly for field type validation
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsPanelContainer extends React.Component {
  static propTypes = {
    channelsList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      removable: PropTypes.bool.isRequired,
    })).isRequired,
    currentChannelId: PropTypes.number.isRequired,
    addChannelState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
    renameChannelState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
    removeChannelState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
    modalInputErrors: PropTypes.object.isRequired,
    changeCurrentChannel: PropTypes.func.isRequired,
    addChannelRequest: PropTypes.func.isRequired,
    renameChannelRequest: PropTypes.func.isRequired,
    removeChannelRequest: PropTypes.func.isRequired,
  }

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
    this.props.addChannelRequest(name);
  }

  onRenameChannel = ({ modalInput: newName }) => {
    this.props.renameChannelRequest(this.state.channelToRename.id, newName);
  }

  onRemoveChannel = () => {
    this.props.removeChannelRequest(this.state.channelToRemove.id);
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

  makeAddChannelProps() {
    const isValidInput = Object.keys(this.props.modalInputErrors).length === 0;
    return {
      id: 'addChannelInput',
      submitLabel: 'Add',
      onCloseHandler: this.toggleAddModal,
      validate: this.validateChannelName,
      onSubmitHandler: this.onAddChannel,
      requestState: this.props.addChannelState,
      isValidInput,
    };
  }

  makeRenameChannelProps() {
    const isValidInput = Object.keys(this.props.modalInputErrors).length === 0;
    return {
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
      editModeOn: this.state.editModeOn,
      channelsList: this.props.channelsList,
      currentChannelId: this.props.currentChannelId,
      handleOnChannelClick: this.onChannelClick,
      onRemoveClickHandler: this.setChannelToRemove,
      onRenameClickHandler: this.setChannelToRename,
    };
  }
  makeChannelsPanelHeaderProps() {
    return {
      editModeOn: this.state.editModeOn,
      handleToggleEditMode: this.toggleEditMode,
      handleToggleAddModal: this.toggleAddModal,
    };
  }

  render() {
    return (
      <div className="d-flex flex-column vh-100">
        <div className="text-white-50">
          <ChannelsPanelHeader {...this.makeChannelsPanelHeaderProps()} />
        </div>
        <div className="scrollable">
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
