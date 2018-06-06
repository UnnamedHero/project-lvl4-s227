import { combineReducers } from 'redux';
import { handleActions, combineActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const user = handleActions({}, {});

const UI = handleActions({
  [actions.toggleEditChannelsUiState](state) {
    return { editChannels: !state.editChannels };
  },
}, {
  editChannels: false,
});

const channels = handleActions({
  [actions.changeCurrentChannel](state, { payload: { id } }) {
    return { ...state, currentChannelId: id };
  },
  [actions.addChannelSocket](state, { payload: { channel } }) {
    const newChannels = [...state.channelsList, channel];
    return { ...state, channelsList: newChannels };
  },
  [actions.removeChannelSocket](state, { payload: { id } }) {
    const newChannels = state.channelsList.filter(ch => ch.id !== id);
    const newCurrentChannelId = state.currentChannelId === id ?
      state.defaultChannelId :
      state.currentChannelId;
    return { channelsList: newChannels, currentChannelId: newCurrentChannelId };
  },
  [actions.renameChannelSocket](state, { payload: { channel: { id, name: newName } } }) {
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

const renameChannelState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelSuccess]() {
    return 'success';
  },
  [actions.renameChannelFailure]() {
    return 'failure';
  },
}, 'none');

const removeChannelState = handleActions({
  [actions.removeChannelRequest]() {
    return 'requested';
  },
  [actions.removeChannelSuccess]() {
    return 'success';
  },
  [actions.removeChannelFailure]() {
    return 'failure';
  },
}, 'none');

const sendMessageState = handleActions({
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
  [actions.removeChannelSocket](state, { payload: { id } }) {
    return state.filter(m => m.id !== id);
  },
}, []);

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
  [actions.renameChannelFailure](_, { payload: { error } }) {
    return { type: 'warning', headline: error, message: 'Channel was not renamed, request failed' };
  },
  [actions.removeChannelFailure](_, { payload: { error } }) {
    return { type: 'warning', headline: error, message: 'Channel was not removed, request failed' };
  },
}, null);

const formReducers = formReducer.plugin({
  NewMessage: handleActions({
    [actions.sendMessageRequest](state) {
      return {
        ...state,
        fields: {
          messageText: {
            requestPending: true,
          },
        },
      };
    },
    [actions.sendMessageFailure](state) {
      return {
        ...state,
        fields: {
          messageText: {
            requestPending: false,
          },
        },
      };
    },
    [actions.sendMessageSuccess](state) {
      return {
        ...state,
        values: {
          messageText: undefined,
        },
        registeredFields: {
          messageText: undefined,
        },
        fields: {
          newMessage: {
            messageText: false,
          },
        },
      };
    },
  }, {}),
  ModalEditor: handleActions({
    [combineActions(
      actions.addChannelSuccess,
      actions.renameChannelSuccess,
    )](state) {
      return {
        ...state,
        values: {
          modalInput: undefined,
        },
        registeredFields: {
          modalInput: undefined,
        },
        fields: {
          modalInput: {
            requestPending: false,
          },
        },
      };
    },
    [combineActions(
      actions.addChannelFailure,
      actions.renameChannelFailure,
    )](state) {
      return {
        ...state,
        fields: {
          modalInput: {
            requestPending: false,
          },
        },
      };
    },
    [combineActions(
      actions.addChannelRequest,
      actions.renameChannelRequest,
    )](state) {
      return {
        ...state,
        fields: {
          modalInput: {
            requestPending: true,
          },
        },
      };
    },
  }, {}),
});

export default combineReducers({
  UI,
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

