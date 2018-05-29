import { createSelector } from 'reselect';

export const getMessages = state => state.messages;
export const getCurrentChannel = state => state.channels.currentChannelId;

export const getCurrentChannelMessagesSelector = createSelector(
  getMessages,
  getCurrentChannel,
  (messages, currentChannelId) => messages.filter(m => m.channelId === currentChannelId),
);
