import { createAction } from 'redux-actions';
import axios from 'axios';

export const initUserName = createAction('USER_INIT_NAME');
export const initChannelsList = createAction('CHANNELS_INIT_LIST');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const addMessageSocket = createAction('MESSAGE_ADD_SOCKET');

export const sendMessage = (messageText, channelId, userName) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const attributes = { author: userName, body: messageText.messageText };
    await axios.post(`/api/v1/channels/${channelId}/messages`, { data: { attributes } });
    dispatch(sendMessageSuccess());
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};
