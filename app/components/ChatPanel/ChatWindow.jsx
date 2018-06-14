import React from 'react';
import { messagesType } from '../../types';

class ChatWindow extends React.Component {
  static propTypes = {
    messages: messagesType.isRequired,
  }

  constructor(props) {
    super(props);
    this.scrollTarget = React.createRef();
  }

  componentDidUpdate() {
    this.scrollTarget.current.scrollIntoView();
  }

  renderMessages() {
    return this.props.messages.map(message => (
      <div key={message.id} className="list-group-item flex-column align-items-start w-100 bg-light p-1 m-0">
        <div className="d-flex w-100  ">
          <p className="font-weight-bold p-0 m-0">{message.author}:</p>
        </div>
        <p className="word-wrap-bw p-0 m-0">{message.body}</p>
      </div>));
  }

  render() {
    return (
      <div className="list-group">
        {this.renderMessages()}
        <div ref={this.scrollTarget} />
      </div>);
  }
}

export default ChatWindow;
