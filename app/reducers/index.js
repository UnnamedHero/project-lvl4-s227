import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';

import * as actions from '../actions';

const channels = handleActions({
  [actions.getChannelsList](state, { payload: { channels } }) {
    return { ...state, channels };
  }
}, {});

export default combineReducers({
  channels,
});