import PropTypes from 'prop-types';

export const messagesType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  author: PropTypes.string,
  body: PropTypes.string,
}));

export const channelType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  removable: PropTypes.bool.isRequired,
});

export const channelsListType = PropTypes.arrayOf(channelType);

export const requestStateType = PropTypes.oneOf(['none', 'requested', 'failure', 'success']);
