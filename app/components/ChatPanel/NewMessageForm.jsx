import React from 'react';
import { Field, reduxForm, propTypes as reduxPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import cn from 'classnames';
import InputField from '../InputField';

@reduxForm({ form: 'NewMessage' })
class NewMessageForm extends React.Component {
  static propTypes = {
    ...reduxPropTypes,
    sendMessageHandler: PropTypes.func.isRequired,
    sendMessageState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
  }

  render() {
    const { sendMessageState, handleSubmit, sendMessageHandler } = this.props;
    const isRequestPending = sendMessageState !== 'requested';

    const buttonClasses = {
      disabled: isRequestPending,
    };
    return (
      <form onSubmit={handleSubmit(sendMessageHandler)}>
        <Field name="messageText" component={InputField} />
        <button type="submit" hidden className={cn(buttonClasses)} />
      </form>);
  }
}

export default NewMessageForm;
