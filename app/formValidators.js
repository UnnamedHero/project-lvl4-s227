import find from 'lodash/find';

const validateChannelName = (channels, name) => {
  const isExists = find(channels, ch => ch.name === name);
  return isExists ? { error: 'Channel name already exist' } : null;
};

export default validateChannelName;
