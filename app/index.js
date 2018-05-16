
import io from 'socket.io-client';
// import gon from 'gon';
import Cookie from 'js-cookie';
import faker from 'faker';
import ReactDOM from 'react-dom';
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import App from './components/App';
import reducers from './reducers';
import { addMessageSocket } from './actions';

/* eslint-disable no-underscore-dangle */
const identity = p => p;
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = (ext && ext()) || identity;
/* eslint-disable */

const store = createStore(
  reducers,
  compose(        
    applyMiddleware(thunk),
    devtoolMiddleware,    
  ),
);

const initUserName = () => {
  const cookieName = Cookie.get('userName');  
  if (!cookieName) {
    Cookie.set('userName', faker.name.findName());
  }
};

initUserName();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io(`http://localhost:${process.env.PORT || 4000}`);

socket.on('newMessage', ( { data : { attributes : message } }) => {  
  store.dispatch(addMessageSocket({ message }));
})

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
 document.getElementById('application')
);