import React from 'react';
import ChatWindow from './ChatWindow';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannelMessagesSelector, getCurrentChannelName } from '../selectors';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channels.currentChannelId,
    messages: getCurrentChannelMessagesSelector(state),
    currentChannelName: getCurrentChannelName(state),
    userName: state.user.name,
    sendMessageState: state.sendMessageState,
  };
  return props;
};

@connect(mapStateToProps)
class ChatPanel extends React.Component {
  sendMessage = (messageText) => {
    this.props.sendMessage(messageText, this.props.currentChannelId, this.props.userName);
  }

  render() {
    const { userName, currentChannelName, messages } = this.props;

    const chatWindowsProps = {
      userName,
      currentChannelName,
      messages,
    };

    const newMessageFormProps = {
      sendMessageHandler: this.sendMessage,
      sendMessageState: this.props.sendMessageState,
    };

    return (
      <div className="d-flex flex-column vh-100">
        <ChatWindow {...chatWindowsProps} />
        <NewMessageForm {...newMessageFormProps} />
      </div>);
  }
}

export default ChatPanel;
