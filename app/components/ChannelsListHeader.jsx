import React from 'react';
import { Button } from 'reactstrap';
import ModalEditor from './ModalEditor';
import connect from '../connect';
import validateChannelName from '../formValidators';


const mapStateToProps = (state) => {
  const props = {
    uiEditChannels: state.UI.editChannels,
    channels: state.channels.channelsList,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsListHeader extends React.Component {
  state = { isModalOpen: false }

  addChannel = ({ modalEditorInput: name }) => {
    this.props.addChannel(name);
  }

  toggleEditor = () => {
    this.props.toggleEditChannelsUiState();
    // this.setState({ isEditorOpen: !this.state.isEditorOpen });
  }

  toggleAddChannelModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  renderAddChannelModal = () => {
    const addProps = {
      headerLabel: 'Add channel',
      submitLabel: 'Add',
      cancelLabel: 'Close',
      submitHandler: this.addChannel,
      cancelHandler: this.toggleAddChannelModal,
      validate: validateChannelName.bind(null, this.props.channels),
      enableReinitialize: true,
      initialValues: {},
      requestType: 'channelAddState',
      closeOnSuccess: false,
    };
    return <ModalEditor isOpen {...addProps} />;
  }

  render() {
    const { uiEditChannels } = this.props;
    const editStatus = `edit mode ${uiEditChannels ? 'on' : 'off'}`;
    return (
      <span>
        Channels:
        <Button color="info" size="sm" onClick={this.toggleEditor}>{editStatus}</Button>
        { this.props.uiEditChannels && <Button color="link" onClick={this.toggleAddChannelModal}>Add channel</Button> }
        { this.state.isModalOpen && this.renderAddChannelModal() }
      </span>
    );
  }
}
export default ChannelsListHeader;
