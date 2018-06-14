import React from 'react';
import { Field, reduxForm, propTypes as reduxPropTypes } from 'redux-form';
import PropTypes from 'prop-types';
import InputField from '../InputField';
import { requestStateType } from '../../types';

@reduxForm({ form: 'NewMessage' })
class NewMessageForm extends React.Component {
  static propTypes = {
    ...reduxPropTypes,
    onSubmit: PropTypes.func.isRequired,
    sendMessageState: requestStateType.isRequired,
  }

  render() {
    const { sendMessageState, handleSubmit } = this.props;
    const isRequestPending = sendMessageState === 'requested';

    const disabledProp = {
      disabled: isRequestPending,
    };
    return (
      <form onSubmit={handleSubmit}>
        <div className="d-flex">
          <Field name="messageText" component={InputField} />
          <button type="submit" className="ml-2" {...disabledProp} >Send</button>
        </div>
      </form>);
  }
}

export default NewMessageForm;
