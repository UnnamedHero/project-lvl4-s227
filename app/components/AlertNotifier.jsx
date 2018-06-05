import React from 'react';
import { AlertContainer, Alert } from 'react-bs-notifier';
import connect from '../connect';

const mapStateToProps = ({ notification }) => {
  const props = {
    ...notification,
  };
  return props;
};

const AlertNotifier = (props) => {
  const {
    type, headline, message, dismissNotification,
  } = props;
  if (!type) {
    return null;
  }
  return (
    <AlertContainer>
      <Alert type={type} onDismiss={dismissNotification} headline={headline} timeout={5000}>
        {message}
      </Alert>
    </AlertContainer>);
};

export default connect(mapStateToProps)(AlertNotifier);
