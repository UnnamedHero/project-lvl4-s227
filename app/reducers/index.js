import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const user = handleActions({}, {});

const getFieldRequestPendingState = fieldName => ({
  fields: {
    [fieldName]: {
      isRequestPending: true,
    },
  },
});

const getFieldRequestFailureState = fieldName => ({
  fields: {
    [fieldName]: {
      isRequestPending: false,
    },
  },
});

const getFieldRequestSuccessState = fieldName => ({
  values: {
    [fieldName]: undefined,
  },
  registeredFields: {
    [fieldName]: undefined,
  },
  fields: {
    [fieldName]: {
      isRequestPending: false,
    },
  },
});

const getErrNotificationWithMessage = (error, message) => ({ type: 'warning', headline: error, message });

const channels = handleActions({
  [actions.changeCurrentChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.addChannel](state, { payload: { channel } }) {
    const newChannels = [...state.channelsList, channel];
    return { ...state, channelsList: newChannels };
  },
  [actions.removeChannel](state, { payload: { id } }) {
    const newChannels = state.channelsList.filter(ch => ch.id !== id);
    const newCurrentChannelId = state.currentChannelId === id ?
      state.defaultChannelId :
      state.currentChannelId;
    return { ...state, channelsList: newChannels, currentChannelId: newCurrentChannelId };
  },
  [actions.renameChannel](state, { payload: { channel: { id, name: newName } } }) {
    const newChannels = state.channelsList.map((ch) => {
      if (ch.id === id) {
        return { ...ch, name: newName };
      }
      return ch;
    });
    return { ...state, channelsList: newChannels };
  },
}, {});

const addChannelState = handleActions({
  [actions.addChannelRequestPending]() {
    return 'requested';
  },
  [actions.addChannelRequestSuccess]() {
    return 'success';
  },
  [actions.addChannelRequestFailure]() {
    return 'failure';
  },
}, 'none');

const renameChannelState = handleActions({
  [actions.renameChannelRequestPending]() {
    return 'requested';
  },
  [actions.renameChannelRequestSuccess]() {
    return 'success';
  },
  [actions.renameChannelRequestFailure]() {
    return 'failure';
  },
}, 'none');

const removeChannelState = handleActions({
  [actions.removeChannelRequestPending]() {
    return 'requested';
  },
  [actions.removeChannelRequestSuccess]() {
    return 'success';
  },
  [actions.removeChannelRequestFailure]() {
    return 'failure';
  },
}, 'none');

const sendMessageState = handleActions({
  [actions.sendMessageRequestPending]() {
    return 'requested';
  },
  [actions.sendMessageRequestSuccess]() {
    return 'success';
  },
  [actions.sendMessageRequestFailure]() {
    return 'failure';
  },
}, 'none');

const messages = handleActions({
  [actions.addMessage](state, { payload: { message } }) {
    return [...state, message];
  },
  [actions.removeChannel](state, { payload: { id } }) {
    return state.filter(m => m.id !== id);
  },
}, []);

const notification = handleActions({
  [actions.dismissNotification]() {
    const info = null;
    return info;
  },
  [actions.sendMessageRequestSuccess]() {
    const info = null;
    return info;
  },
  [actions.sendMessageRequestFailure](_, { payload: { error } }) {
    return getErrNotificationWithMessage(error, 'Message was not delivered to server');
  },
  [actions.addChannelRequestFailure](_, { payload: { error } }) {
    return getErrNotificationWithMessage(error, 'Channel was not added, request failed');
  },
  [actions.renameChannelRequestFailure](_, { payload: { error } }) {
    return getErrNotificationWithMessage(error, 'Channel was not renamed, request failed');
  },
  [actions.removeChannelRequestFailure](_, { payload: { error } }) {
    return getErrNotificationWithMessage(error, 'Channel was not removed, request failed');
  },
}, null);

const NewMessage = handleActions({
  [actions.sendMessageRequestPending](state) {
    return {
      ...state,
      ...getFieldRequestPendingState('messageText'),
    };
  },
  [actions.sendMessageRequestFailure](state) {
    return {
      ...state,
      ...getFieldRequestFailureState('messageText'),
    };
  },
  [actions.sendMessageRequestSuccess](state) {
    return {
      ...state,
      ...getFieldRequestSuccessState('messageText'),
    };
  },
}, {});

const ModalEditor = handleActions({
  [combineActions(
    actions.addChannelRequestSuccess,
    actions.renameChannelRequestSuccess,
  )](state) {
    return {
      ...state,
      ...getFieldRequestSuccessState('modalInput'),
    };
  },
  [combineActions(
    actions.addChannelRequestFailure,
    actions.renameChannelRequestFailure,
  )](state) {
    return {
      ...state,
      ...getFieldRequestFailureState('modalInput'),
    };
  },
  [combineActions(
    actions.addChannelRequestPending,
    actions.renameChannelRequestPending,
  )](state) {
    return {
      ...state,
      ...getFieldRequestPendingState('modalInput'),
    };
  },
}, {});

const formReducers = formReducer.plugin({
  NewMessage,
  ModalEditor,
});

export default combineReducers({
  user,
  messages,
  channels,
  form: formReducers,
  addChannelState,
  renameChannelState,
  removeChannelState,
  sendMessageState,
  notification,
});

