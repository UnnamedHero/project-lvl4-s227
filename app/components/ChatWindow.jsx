import React from 'react';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.scrollTarget = React.createRef();
  }

  componentDidUpdate() {
    this.scrollTarget.current.scrollIntoView({ behavior: 'smooth' });
  }

  renderMessages() {
    return this.props.messages.map(message => (
      <div className="list-group-item flex-column align-items-start w-100 bg-light" key={message.id}>
        <div className="d-flex w-100">
          <p className="mb-1 font-weight-bold">{message.author}:</p>
        </div>
        <p className="mb-1">{message.body}</p>
      </div>));
  }

  render() {
    return (
      <div className="d-flex flex-column vh-100">
        <div>
          <h2>{this.props.userName}{' @ '}{this.props.currentChannelName}</h2>
        </div>
        <div className="list-group scrollable">
          {this.renderMessages()}
          <div ref={this.scrollTarget} />
        </div>
      </div>);
  }
}
export default ChatWindow;
// export default connect(mapStateToProps)(ChatWindow);
