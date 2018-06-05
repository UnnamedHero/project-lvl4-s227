import React from 'react';
import find from 'lodash/find';
import { isValid } from 'redux-form';
import ChannelsPanelHeader from './ChannelsPanelHeader';
import ChannelsList from './ChannelsList';
import ModalChannelNameEditor from './ModalChannelNameEditor';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channelsList: state.channels.channelsList,
    defaultChannelId: state.channels.defaultChannelId,
    currentChannelId: state.channels.currentChannelId,
    addChannelState: state.addChannelState,
    renameChannelState: state.renameChannelState,
    removeChannelState: state.removeChannelState,
    isValidModalInput: isValid('ModalEditor')(state),
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsPanel extends React.Component {
  state = {
    editModeOn: false,
    addModal: false,
    // removeModal: false,
    // renameModal: false,
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

  toggleEditMode = () => {
    this.setState({ editModeOn: !this.state.editModeOn });
  }

  toggleAddModal = () => {
    this.setState({ addModal: !this.state.addModal });
  }

  render() {
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
    };
    const addChannelProps = this.state.addModal && {
      id: 'addChannelInput',
      handleToggleModal: this.toggleAddModal,
      validate: this.validateChannelName,
      onSubmitHandler: this.onAddChannel,
      requestState: this.props.addChannelState,
      isValidInput: this.props.isValidModalInput,
    };

    const isAddModalOpen = this.state.addModal;
    return (
      <div className="d-flex flex-column vh-100">
        <div className="text-white-50">
          <ChannelsPanelHeader {...channelsPanelHeaderProps} />
        </div>
        <div className="scrollable">
          <ChannelsList {...channelsListProps} />
        </div>
        { isAddModalOpen && <ModalChannelNameEditor {...addChannelProps} /> }
      </div>
    );
  }
}

export default ChannelsPanel;
