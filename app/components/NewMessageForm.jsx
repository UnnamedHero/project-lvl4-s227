import React from 'react';
import { Field, reduxForm } from 'redux-form';

class NewMessageForm extends React.Component {
  sendMessage = (values) => {
    this.props.sendMessage(values, this.props.currentChannelId, this.props.userName);
    this.props.reset();
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.sendMessage)}>
        <Field name="messageText" component="input" required type="text" className="form-control" />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>);
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
