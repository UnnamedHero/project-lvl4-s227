// import faker from 'faker';
import gon from 'gon';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

import ReactDOM from 'react-dom';
import React from 'react';
import ChannelsList from '../app/components/ChannelsList.jsx';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(<ChannelsList gon={window.gon} />, document.getElementById('chat'));