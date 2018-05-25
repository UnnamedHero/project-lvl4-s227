import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import connect from '../connect';
import InputField from './InputField';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channelsList.currentChannelId,
    userName: state.user.name,
    sendingState: state.requestStates.messageSendingState,
  };
  return props;
};

@connect(mapStateToProps)
class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.el = React.createRef();
  }

  componentDidMount() {
    this.el.current.querySelector('input').focus();
  }

  componentDidUpdate(prevProps) {
    const { sendingState: prevState } = prevProps;
    const { sendingState: currState } = this.props;
    if (prevState !== currState && currState === 'success') {
      this.props.reset();
      this.el.current.querySelector('input').focus();
    }
  }

  sendMessage = (values) => {
    this.props.sendMessage(values, this.props.currentChannelId, this.props.userName);
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
      <form onSubmit={this.props.handleSubmit(this.sendMessage)} className="d-flex" ref={this.el}>
        <Field name="messageText" component={InputField} canSend={canSend} />
        <button type="submit" className={cn(buttonClasses)} hidden>Send</button>
      </form>);
  }
}

export default reduxForm({
  form: 'newMessage',
})(NewMessageForm);
