import React from 'react';

const renderMessage = ({ id, author, body }) => (
  <div className="list-group-item flex-column align-items-start w-100 bg-light rounded" key={id}>
    <div className="d-flex w-100">
      <p className="mb-1 font-weight-bold">{author}:</p>
    </div>
    <p className="mb-1">{body}</p>
  </div>
);

const ChatWindow = props => (
  <div className="list-group">
    {props.messages.map(renderMessage)}
  </div>);


export default ChatWindow;