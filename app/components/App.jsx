import React from 'react';
import ChannelsListContainer from '../containers/ChannelsList';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const App = () => (
  <div className = 'container'>
    <div className = 'row'>
      <div className = 'col-3 '>
        <ChannelsListContainer />          
      </div>      
      <div className = 'col-9'>
        <div className = 'row '>
          <div className = 'col-12'>
            <ChatWindow />              
          </div>
        </div>
        <div className = 'row'>
          <div className = 'col-12 align-self-end'>
            <ChatInput />          
          </div>      
        </div>
      </div>
    </div>
  </div>
  
);

export default App;