import gon from 'gon';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

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
  form: formReducer,
  messageSendingState,
  messages,
});

