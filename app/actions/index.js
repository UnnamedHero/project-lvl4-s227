import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const setUserName = createAction('USER_SET_NAME');

export const changeCurrentChannel = createAction('CHANNEL_CHANGE');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const dismissNotification = createAction('NOTIFICATION_DISMISS');

export const addMessageSocket = createAction('MESSAGE_ADD_SOCKET');
export const addChannelSocket = createAction('CHANNEL_ADD_SOCKET');

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
