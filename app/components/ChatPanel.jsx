import React from 'react';
import ChatHeader from './ChatHeader';
import ChatWindow from './ChatWindow';
import MessageInputBar from './MessageInputbar';

class ChatPanel extends React.Component {
  render() {
    return (
      <div className="d-flex col-9 flex-column justify-content-between vh-100 bg-secondary">
        <ChatHeader />
        <ChatWindow />
        <MessageInputBar />
      </div>);
  }
}
// <div className="scrollable word-wrap-bw">
export default ChatPanel;
