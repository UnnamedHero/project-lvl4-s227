import { createAction } from 'redux-actions';
import axios from 'axios';
import routes from '../routes';

export const setUserName = createAction('USER_SET_NAME');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const dismissNotification = createAction('NOTIFICATION_DISMISS');

export const addMessageSocket = createAction('MESSAGE_ADD_SOCKET');

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
