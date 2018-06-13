import React from 'react';
import PropTypes from 'prop-types';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import NewMessageForm from './NewMessageForm';
import { getCurrentChannelMessagesSelector, getCurrentChannelNameSelector } from '../../selectors';
import connect from '../../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channels.currentChannelId,
    messages: getCurrentChannelMessagesSelector(state),
    currentChannelName: getCurrentChannelNameSelector(state),
    userName: state.user.name,
    sendMessageState: state.sendMessageState,
  };
  return props;
};

@connect(mapStateToProps)
class ChatPanelContainer extends React.Component {
  static propTypes = {
    currentChannelId: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      author: PropTypes.string,
      body: PropTypes.string,
    })).isRequired,
    currentChannelName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    sendMessageState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
    sendMessageRequest: PropTypes.func.isRequired,
  }

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
      onSubmit: this.sendMessage,
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
