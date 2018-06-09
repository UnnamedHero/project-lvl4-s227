import React from 'react';
import { AlertContainer, Alert } from 'react-bs-notifier';
import PropTypes from 'prop-types';
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
  if (type === 'none') {
    return null;
  }

  return (
    <AlertContainer>
      <Alert type={type} onDismiss={dismissNotification} headline={headline} timeout={5000}>
        {message}
      </Alert>
    </AlertContainer>);
};

AlertNotifier.defaultProps = {
  headline: '',
  message: '',
};

AlertNotifier.propTypes = {
  type: PropTypes.oneOf(['warning', 'none']).isRequired,
  headline: PropTypes.string,
  message: PropTypes.string,
  dismissNotification: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(AlertNotifier);
