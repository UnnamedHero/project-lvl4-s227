import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import ModalEditor from './ModalEditor';
import validateChannelName from '../formValidators';
import connect from '../connect';


const mapStateToProps = (state) => {
  const props = {
    channelsList: state.channels.channelsList,
    channelRemoveState: state.requestStates.channelRemoveState,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsListEditor extends React.Component {
  state = {
    deleteModal: false,
    renameModal: false,
    channel: {},
  }

  componentDidUpdate(prevProps) {
    const { channelRemoveState } = this.props;
    const { channelRemoveState: prevChannelRemoveState } = prevProps;
    if ((channelRemoveState !== prevChannelRemoveState) && (channelRemoveState !== 'requested')) {
      this.closeDeleteModal();
    }
  }

  openDeleteModal = channel => () => {
    this.setState({
      deleteModal: true,
      channel,
    });
  }

  openRenameModal = channel => () => {
    this.setState({
      renameModal: true,
      channel,
    });
  }

  renameChannel = (id, { modalEditorInput: name }) => {
    this.props.renameChannel(id, name);
  }

  removeChannel = id => () => {
    this.props.removeChannel(id);
  }

  closeDeleteModal = () => {
    this.setState({ deleteModal: false });
  }

  closeRenameModal = () => {
    this.setState({ renameModal: false });
  }

  renderChannelsList = () => {
    const { channelsList } = this.props;
    return channelsList.map(channel => (
      <li key={channel.id} className="list-group-item d-flex justify-content-between text-dark align-items-center">
        {channel.name}
        { channel.removable &&
        <ButtonGroup size="sm">
          <Button onClick={this.openRenameModal(channel)} >edit</Button>
          <Button onClick={this.openDeleteModal(channel)} >delete</Button>
        </ButtonGroup> }
      </li>));
  }

  renderDeleteModal = () => {
    const { channel } = this.state;
    const deleteModalProps = {
      okHandler: this.removeChannel(channel.id),
      cancelHandler: this.closeDeleteModal,
      bodyText: channel.name,
    };
    return <DeleteConfirmDialog isOpen {...deleteModalProps} />;
  }

  renderRenameModal = () => {
    const { channel } = this.state;
    const renameModalProps = {
      headerLabel: 'Rename channel',
      submitLabel: 'Rename',
      cancelLabel: 'Close',
      submitHandler: this.renameChannel.bind(null, channel.id),
      cancelHandler: this.closeRenameModal,
      validate: validateChannelName.bind(null, this.props.channelsList),
      enableReinitialize: true,
      initialValues: { modalEditorInput: channel.name },
      requestType: 'channelRenameState',
      closeOnSuccess: true,
    };
    return <ModalEditor isOpen {...renameModalProps} />;
  }

  render() {
    return (
      <div>
        <ul className="word-wrap-bw list-group">
          {this.renderChannelsList()}
        </ul>
        { this.state.deleteModal && this.renderDeleteModal() }
        { this.state.renameModal && this.renderRenameModal() }
      </div>
    );
  }
}

export default ChannelsListEditor;
