import React from 'react';
import ChannelsListContainer from '../containers/ChannelsList';
import UserPanelContainer from '../containers/UserPanel';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const App = () => (
  <div className="container-fluid d-flex">
    <div className="row flex-fill">
      <div className="col-2 flex-fill bg-dark text-white-50">
        <div className="row">
          <UserPanelContainer />
        </div>
        <div className="row">
          <ChannelsListContainer />
        </div>
      </div>
      <div className="col-10 bg-light">
        <div className="row">
          <div className="col">
            <ChatWindow />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
