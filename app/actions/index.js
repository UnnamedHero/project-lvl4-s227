import { createAction } from 'redux-actions';
import axios from 'axios';

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const sendMessage = (messageText, channelId, userName) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const resp = await axios.post(`/channels/${channelId}/messages`, { author: userName, body: messageText });
    dispatch(sendMessageSuccess({ message: resp.data.attributes }));
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};

// export const getChannelsList = createAction('CHANNELS_GET_LIST');
// export const switchChannel = createAction('CHANNEL_SWITCH');

// export const
