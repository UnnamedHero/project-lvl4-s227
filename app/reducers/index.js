import gon from 'gon'; //eslint-disable-line
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const user = handleActions({
  [actions.setUserName](state, { payload: { name } }) {
    return { name };
  },
}, '');

const channelsList = handleActions({
  [actions.changeCurrentChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.addChannelSocket](state, { payload: { channel } }) {
    const newChannels = [...state.channels, channel];
    return { ...state, channels: newChannels };
  },
  [actions.removeChannelSocket](state, { payload: { id } }) {
    const newChannels = state.channels.filter(ch => ch.id !== id);
    const newCurrentChannelId = state.currentChannelId === id ?
      gon.currentChannelId :
      state.currentChannelId;
    return { channels: newChannels, currentChannelId: newCurrentChannelId };
  },
}, {
  channels: gon.channels,
  currentChannelId: gon.currentChannelId,
});

const requestStates = handleActions({
  [actions.sendMessageRequest](state) {
    return { ...state, messageSendingState: 'requested' };
  },
  [actions.sendMessageSuccess](state) {
    return { ...state, messageSendingState: 'success' };
  },
  [actions.sendMessageFailure](state) {
    return { ...state, messageSendingState: 'failure' };
  },
  [actions.addChannelRequest](state) {
    return { ...state, channelAddState: 'requested' };
  },
  [actions.addChannelSuccess](state) {
    return { ...state, channelAddState: 'success' };
  },
  [actions.addChannelFailure](state) {
    return { ...state, channelAddState: 'failure' };
  },
  [actions.removeChannelRequest](state) {
    return { ...state, channelRemoveState: 'requested' };
  },
  [actions.removeChannelSuccess](state) {
    return { ...state, channelRemoveState: 'success' };
  },
  [actions.removeChannelFailure](state) {
    return { ...state, channelRemoveState: 'failure' };
  },
}, {
  messageSendingState: 'none',
  channelAddState: 'none',
  channelRemoveState: 'none',
});

const messages = handleActions({
  [actions.addMessageSocket](state, { payload: { message } }) {
    return [...state, message];
  },
  [actions.removeChannelSocket](state, { payload: { id } }) {
    return state.filter(m => m.id !== id);
  },
}, gon.messages);

const notification = handleActions({
  [actions.dismissNotification]() {
    const info = null;
    return info;
  },
  [actions.sendMessageSuccess]() {
    const info = null;
    return info;
  },
  [actions.sendMessageFailure](state, { payload: { error } }) {
    return { type: 'warning', headline: error, message: 'Message was not delivered to server' };
  },
  [actions.addChannelFailure](state, { payload: { error } }) {
    return { type: 'warning', headline: error, message: 'Channel was not added, request failed' };
  },
}, null);

export default combineReducers({
  user,
  messages,
  channelsList,
  form: formReducer,
  requestStates,
  notification,
});

