import gon from 'gon'; // eslint-disable-line
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

const messages = handleActions({
  [actions.addMessageSocket](state, { payload: { message } }) {
    return [...state, message];
  },
}, gon.messages);

export default combineReducers({
  user,
  channelsList,
  form: formReducer,
  messageSendingState,
  messages,
});

