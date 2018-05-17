import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';

class NewMessageForm extends React.Component {
  sendMessage = (values) => {
    this.props.sendMessage(values, this.props.currentChannelId, this.props.userName);
    this.props.reset();
  }

  render() {
    const { sendingState } = this.props;
    const canSend = sendingState !== 'requested';
    const buttonClasses = {
      btn: true,
      'btn-primary': true,
      disabled: !canSend,
    };
    return (
      <form onSubmit={this.props.handleSubmit(this.sendMessage)} className="d-flex">
        <Field name="messageText" component="input" required type="text" className="form-control mr-2" />
        <button type="submit" className={cn(buttonClasses)}>Send</button>
      </form>);
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
