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
}, {
  channels: gon.channels,
  currentChannelId: gon.currentChannelId,
});

const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageSuccess]() {
    return 'success';
  },
  [actions.sendMessageFailure]() {
    return 'failure';
  },
}, 'none');

const channelAddState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelSuccess]() {
    return 'success';
  },
  [actions.addChannelFailure]() {
    return 'failure';
  },
}, 'none');

const messages = handleActions({
  [actions.addMessageSocket](state, { payload: { message } }) {
    return [...state, message];
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
  messageSendingState,
  channelAddState,
  notification,
});

