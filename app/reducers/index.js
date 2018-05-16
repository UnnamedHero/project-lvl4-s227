import gon from 'gon';
import Cookie from 'js-cookie';
import faker from 'faker';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const user = handleActions({
  [actions.initUserName]() {
    const cookieName = Cookie.get('userName');
    const name = cookieName || faker.name.findName();
    if (!cookieName) {
      Cookie.set('userName', name);
    }
    return { name };
  },
}, 'anon');

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
  form: formReducer,
  messageSendingState,
  messages,
});

