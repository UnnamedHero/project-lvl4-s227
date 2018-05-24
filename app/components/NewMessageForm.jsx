import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channelsList.currentChannelId,
    userName: state.user.name,
    sendingState: state.messageSendingState,
  };
  return props;
};

@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  componentDidUpdate(prevProps) {
    const { sendingState: prevState } = prevProps;
    const { sendingState: currState } = this.props;
    if (prevState !== currState && currState === 'success') {
      this.props.reset();
    }
  }

  sendMessage = (values) => {
    this.props.sendMessage(values, this.props.currentChannelId, this.props.userName);
  }

  render() {
    const { sendingState } = this.props;
    const canSend = sendingState !== 'requested';
    const disabledProp = {
      disabled: !canSend,
    };
    const animationClass = {
      'request-sending': !canSend,
    };
    const buttonClasses = {
      btn: true,
      'btn-primary': true,
      ...disabledProp,
    };
    return (
      <form onSubmit={this.props.handleSubmit(this.sendMessage)} className="d-flex">
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">
              <span className={cn(animationClass)}>#</span>
            </div>
          </div>
          <Field name="messageText" component="input" required type="text" className="form-control" {...disabledProp} />
        </div>
        <button type="submit" className={cn(buttonClasses)} hidden>Send</button>
      </form>);
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
