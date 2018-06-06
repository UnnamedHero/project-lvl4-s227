import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

// export const toggleEditChannelsUiState = createAction('UI/EDIT/CHANNELS/TOGGLE');

export const sendMessageRequestPending = createAction('REQUEST/MESSAGE/SEND/PENDING');
export const sendMessageRequestSuccess = createAction('REQUEST/MESSAGE/SEND/SUCCESS');
export const sendMessageRequestFailure = createAction('REQUEST/MESSAGE/SEND/FAILURE');

export const addChannelRequestPending = createAction('REQUEST/CHANNEL/ADD/PENDING');
export const addChannelRequestSuccess = createAction('REQUEST/CHANNEL/ADD/SUCCESS');
export const addChannelRequestFailure = createAction('REQUEST/CHANNEL/ADD/FAILURE');

export const addMessage = createAction('MESSAGE/ADD');

export const changeCurrentChannel = createAction('CHANNEL/CHANGE');

export const addChannel = createAction('CHANNEL/ADD');

export const removeChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const removeChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const removeChannelFailure = createAction('CHANNEL_DELETE_FAILURE');
export const removeChannelSocket = createAction('CHANNEL_DELETE_SOCKET');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');
export const renameChannelSocket = createAction('CHANNEL_RENAME_SOCKET');

export const dismissNotification = createAction('NOTIFICATION_DISMISS');

export const sendMessage = (messageText, channelId, userName) => async (dispatch) => {
  dispatch(sendMessageRequestPending());
  try {
    const attributes = { author: userName, body: messageText.messageText };
    await axios.post(routes.addMessageToChannelUrl(channelId), { data: { attributes } });
    dispatch(sendMessageRequestSuccess());
  } catch (e) {
    console.log(e);
    dispatch(sendMessageRequestFailure({ error: e.message }));
  }
};

export const addChannelRequest = name => async (dispatch) => {
  dispatch(addChannelRequestPending());
  try {
    const attributes = { name };
    await axios.post(routes.addChannelUrl(), { data: { attributes } });
    dispatch(addChannelRequestSuccess());
  } catch (e) {
    console.log(e);
    dispatch(addChannelRequestFailure({ error: e.message }));
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.editChannelUrl(id), { data: { id } });
    dispatch(removeChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(removeChannelFailure({ error: e.message }));
  }
};

export const renameChannel = (id, newName) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const attributes = { name: newName };
    await axios.patch(routes.editChannelUrl(id), { data: { id, attributes } });
    dispatch(renameChannelSuccess());
  } catch (e) {
    console.log(e);
    dispatch(renameChannelFailure({ error: e.message }));
  }
};

