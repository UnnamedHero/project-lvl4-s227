import { createSelector } from 'reselect';

export const getMessages = state => state.messages;
export const getCurrentChannel = state => state.channelsList.currentChannelId;

export const getChannels = state => state.channelsList.channels;

export const getCurrentChannelMessagesSelector = createSelector(
  getMessages,
  getCurrentChannel,
  (messages, currentChannelId) => messages.filter(m => m.channelId === currentChannelId),
);

export const getEditableChannels = createSelector(
  getChannels,
  channels => channels.filter(c => c.removable),
);
