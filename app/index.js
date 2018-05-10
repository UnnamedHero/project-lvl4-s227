
// import io from 'socket.io-client';
// import gon from 'gon';
import Cookie from 'js-cookie';
import faker from 'faker';
import ReactDOM from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import  { createStore, applyMiddleware, compose } from 'redux';
import App from '../app/components/App';
import reducers from './reducers';

const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();

const store = createStore(
  reducers,
  compose(    
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

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>,
 document.getElementById('chat')
);