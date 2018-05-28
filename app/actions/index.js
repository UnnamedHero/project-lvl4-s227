import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');
export const addMessageSocket = createAction('MESSAGE_ADD_SOCKET');

export const changeCurrentChannel = createAction('CHANNEL_CHANGE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');
export const addChannelSocket = createAction('CHANNEL_ADD_SOCKET');

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
  dispatch(sendMessageRequest());
  try {
    const attributes = { author: userName, body: messageText.messageText };
    await axios.post(routes.addMessageToChannelUrl(channelId), { data: { attributes } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure({ error: e.message }));
  }
};

export const addChannel = name => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const attributes = { name };
    await axios.post(routes.addChannelUrl(), { data: { attributes } });
    dispatch(addChannelSuccess());
  } catch (e) {
    dispatch(addChannelFailure({ error: e.message }));
  }
};

export const removeChannel = id => async (dispatch) => {
  dispatch(removeChannelRequest());
  try {
    await axios.delete(routes.editChannelUrl(id), { data: { id } });
    dispatch(removeChannelSuccess());
  } catch (e) {
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
    dispatch(renameChannelFailure({ error: e.message }));
  }
};

