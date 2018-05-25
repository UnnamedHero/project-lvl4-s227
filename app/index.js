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
import { addMessageSocket, addChannelSocket, removeChannelSocket, renameChannelSocket, setUserName } from './actions';

/* eslint-disable no-underscore-dangle */
const identity = p => p;
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = (ext && ext()) || identity;
/* eslint-disable */

const cookieNameKey = 'userName';

const initUserName = () => {
  const cookieName = Cookie.get(cookieNameKey);
  if (!cookieName) {
    Cookie.set(cookieNameKey, faker.name.findName());
  }
}

const store = createStore(
  reducers,
  compose(        
    applyMiddleware(thunk),
    devtoolMiddleware,    
  ),
);

initUserName();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

store.dispatch(setUserName({ name: Cookie.get(cookieNameKey) }));

const socket = io();

socket.on('newMessage', ( { data : { attributes : message } }) => {  
  store.dispatch(addMessageSocket({ message }));
});

socket.on('newChannel', ( { data: { attributes :  channel } }) => {
  store.dispatch(addChannelSocket({ channel }));
});

socket.on('removeChannel', ( { data: { id } }) => {
  store.dispatch(removeChannelSocket({ id }));
});

socket.on('renameChannel', ( { data: { attributes :  channel } }) => {  
  store.dispatch(renameChannelSocket({ channel }));
});

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
 document.getElementById('application')
);