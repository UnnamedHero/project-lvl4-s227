import React from 'react';
import PropTypes from 'prop-types';

const ChatHeader = props => (
  <div className="word-wrap-bw">
    <h5>{props.userName}{' @ '}{props.currentChannelName}</h5>
  </div>);

ChatHeader.propTypes = {
  userName: PropTypes.string.isRequired,
  currentChannelName: PropTypes.string.isRequired,
};

export default ChatHeader;
