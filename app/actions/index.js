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

export const removeChannelRequestPending = createAction('REQUEST/CHANNEL/DELETE/REQUEST');
export const removeChannelRequestSuccess = createAction('REQUEST/CHANNEL/DELETE/SUCCESS');
export const removeChannelRequestFailure = createAction('REQUEST/CHANNEL/DELETE/FAILURE');

export const renameChannelRequestPending = createAction('REQUEST/CHANNEL/RENAME/REQUEST');
export const renameChannelRequestSuccess = createAction('REQUEST/CHANNEL/RENAME/SUCCESS');
export const renameChannelRequestFailure = createAction('REQUEST/CHANNEL/RENAME/FAILURE');

export const changeCurrentChannel = createAction('CHANNEL/CHANGE');

export const addMessage = createAction('MESSAGE/ADD');
export const addChannel = createAction('CHANNEL/ADD');
export const removeChannel = createAction('CHANNEL/REMOVE');
export const renameChannel = createAction('CHANNEL/RENAME');

export const dismissNotification = createAction('NOTIFICATION/DISMISS');

export const sendMessageRequest = (messageText, channelId, userName) => async (dispatch) => {
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

export const removeChannelRequest = id => async (dispatch) => {
  dispatch(removeChannelRequestPending());
  try {
    await axios.delete(routes.editChannelUrl(id), { data: { id } });
    dispatch(removeChannelRequestSuccess());
  } catch (e) {
    console.log(e);
    dispatch(removeChannelRequestFailure({ error: e.message }));
  }
};

export const renameChannelRequest = (id, newName) => async (dispatch) => {
  dispatch(renameChannelRequestPending());
  try {
    const attributes = { name: newName };
    await axios.patch(routes.editChannelUrl(id), { data: { id, attributes } });
    dispatch(renameChannelRequestSuccess());
  } catch (e) {
    console.log(e);
    dispatch(renameChannelRequestFailure({ error: e.message }));
  }
};

