import find from 'lodash/find';

const validateChannelName = (channels, name = '') => {
  const trimmedName = name.toString().trim();
  const isExists = find(channels, ch => ch.name === trimmedName);
  if (isExists) {
    return { error: 'Channel name already exist' };
  }
  if (trimmedName.length === 0) {
    return { error: 'Channel name cannot be blank' };
  }
  return null;
};

export default validateChannelName;
