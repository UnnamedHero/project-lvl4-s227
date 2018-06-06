import gon from 'gon'; //eslint-disable-line
import Cookie from 'js-cookie';
import faker from 'faker';
import io from 'socket.io-client';
import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';
import { addMessage, addChannelSocket, removeChannelSocket, renameChannelSocket } from './actions';

const identity = p => p;
const ext = window.__REDUX_DEVTOOLS_EXTENSION__; //eslint-disable-line
const devtoolMiddleware = (ext && ext()) || identity;

const cookieNameKey = 'userName';

const initUserName = () => {
  const cookieName = Cookie.get(cookieNameKey);
  if (!cookieName) {
    Cookie.set(cookieNameKey, faker.name.findName());
  }
};

initUserName();

const initState = {
  user: {
    name: Cookie.get(cookieNameKey),
  },
  channels: {
    channelsList: gon.channels,
    defaultChannelId: gon.currentChannelId,
    currentChannelId: gon.currentChannelId,
  },
  messages: gon.messages,
};

const store = createStore(
  reducers,
  initState,
  compose(
    applyMiddleware(thunk),
    devtoolMiddleware,
  ),
);

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

socket.on('newMessage', ({ data: { attributes: message } }) => {
  store.dispatch(addMessage({ message }));
});

socket.on('newChannel', ({ data: { attributes: channel } }) => {
  store.dispatch(addChannelSocket({ channel }));
});

socket.on('removeChannel', ({ data: { id } }) => {
  store.dispatch(removeChannelSocket({ id }));
});

socket.on('renameChannel', ({ data: { attributes: channel } }) => {
  store.dispatch(renameChannelSocket({ channel }));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('application'),
);
