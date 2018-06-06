import React from 'react';

const ChatHeader = props => (
  <div>
    <h2>{props.userName}{' @ '}{props.currentChannelName}</h2>
  </div>);

export default ChatHeader;
