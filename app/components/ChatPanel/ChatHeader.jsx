import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = props => (
  <div>
    <h2>{props.userName}{' @ '}{props.currentChannelName}</h2>
  </div>);

ChatHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  currentChannelName: PropTypes.string.isRequired,
};

export default ChatHeader;
