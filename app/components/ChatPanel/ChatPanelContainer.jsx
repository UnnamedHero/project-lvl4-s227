import React from 'react';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannelMessagesSelector, getCurrentChannelName } from '../../selectors';
import connect from '../../connect';

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
class ChatPanelContainer extends React.Component {
  sendMessage = (messageText) => {
    this.props.sendMessageRequest(messageText, this.props.currentChannelId, this.props.userName);
  }

  render() {
    const { userName, currentChannelName, messages } = this.props;

    const chatHeaderProps = {
      userName,
      currentChannelName,
    };

    const chatWindowsProps = {
      messages,
    };

    const newMessageFormProps = {
      sendMessageHandler: this.sendMessage,
      sendMessageState: this.props.sendMessageState,
    };

    return (
      <div className="d-flex flex-column vh-100 justify-content-between">
        <div>
          <ChatHeader {...chatHeaderProps} />
        </div>
        <div className="scrollable">
          <ChatWindow {...chatWindowsProps} />
        </div>
        <div className="mt-auto">
          <NewMessageForm {...newMessageFormProps} />
        </div>
      </div>);
  }
}

export default ChatPanelContainer;
