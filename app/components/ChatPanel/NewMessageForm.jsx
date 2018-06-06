import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import InputField from '../InputField';

@reduxForm({ form: 'NewMessage' })
class NewMessageForm extends React.Component {
  sendMessage = (values) => {
    this.props.sendMessage(values, this.props.currentChannelId, this.props.userName);
  }

  render() {
    const { sendMessageHandler, sendMessageState } = this.props;
    const requestPending = sendMessageState !== 'requested';

    const buttonClasses = {
      disabled: requestPending,
    };
    return (
      <form onSubmit={this.props.handleSubmit(sendMessageHandler)} >
        <Field name="messageText" component={InputField} />
        <button type="submit" hidden className={cn(buttonClasses)} />
      </form>);
  }
}

export default NewMessageForm;
