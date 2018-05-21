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
import { addMessageSocket, setUserName } from './actions';

/* eslint-disable no-underscore-dangle */
const identity = p => p;
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = (ext && ext()) || identity;
/* eslint-disable */

const userNameKey = 'userName';

const initUserName = () => {
  const cookieName = Cookie.get(userNameKey);
  if (!cookieName) {
    Cookie.set(userNameKey, faker.name.findName());
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

store.dispatch(setUserName({ name: Cookie.get(userNameKey) }));

const socket = io();

socket.on('newMessage', ( { data : { attributes : message } }) => {  
  store.dispatch(addMessageSocket({ message }));
})

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
 document.getElementById('application')
);