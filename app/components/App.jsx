import React from 'react';
import ChannelsListContainer from '../containers/ChannelsList';
import UserPanelContainer from '../containers/UserPanel';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';

const App = () => (
  <div className="container-fluid d-flex vh-100">
    <div className="row flex-fill">
      <div className="col-3 flex-fill scrollable">
        <div className="row">
          <div className="col-12">
            <UserPanelContainer />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ChannelsListContainer />
          </div>
        </div>
      </div>
      <div className="col-9 vh-100">
        <div className="row h-75">
          <div className="col-12 scrollable">
            <ChatWindow />
          </div>
        </div>
        <div className="row h-25">
          <div className="col-12">
            <ChatInput />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default App;
