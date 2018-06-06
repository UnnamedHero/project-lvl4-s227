import React from 'react';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.scrollTarget = React.createRef();
  }

  componentDidUpdate() {
    this.scrollTarget.current.scrollIntoView();
  }

  renderMessages() {
    return this.props.messages.map(message => (
      <div className="list-group-item flex-column align-items-start w-100 bg-light" key={message.id}>
        <div className="d-flex w-100">
          <p className="mb-1 font-weight-bold">{message.author}:</p>
        </div>
        <p className="mb-1 word-wrap-bw">{message.body}</p>
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
