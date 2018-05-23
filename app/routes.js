const host = '';
const apiPrefix = 'api/v1';

export default {
  addMessageToChannelUrl: channelId => [host, apiPrefix, 'channels', channelId, 'messages'].join('/'),
  addChannelUrl: () => [host, apiPrefix, 'channels'].join('/'),
};
