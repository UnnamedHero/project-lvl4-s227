import { createSelector } from 'reselect';
import find from 'lodash/find';

export const getMessages = state => state.messages;
export const getCurrentChannel = state => state.channels.currentChannelId;
export const getChannels = state => state.channels.channelsList;

export const getCurrentChannelMessagesSelector = createSelector(
  getMessages,
  getCurrentChannel,
  (messages, currentChannelId) => messages.filter(m => m.channelId === currentChannelId),
);

export const getCurrentChannelNameSelector = createSelector(
  getChannels,
  getCurrentChannel,
  (channels, currentChannelId) => find(channels, channel => channel.id === currentChannelId).name,
);
