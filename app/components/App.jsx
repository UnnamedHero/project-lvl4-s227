import React from 'react';
import ChannelsPanelContainer from './ChannelsPanel/ChannelsPanelContainer';
import ChatPanelContainer from './ChatPanel/ChatPanelContainer';
import ModalAlertNotifier from './ModalAlertNotifier';

const App = () => (
  <div className="container-fluid flex-wrap px-0">
    <div className="d-flex flex-wrap vh-100">
      <div className="col-sm-3 bg-dark vh-100 px-2">
        <ChannelsPanelContainer />
      </div>
      <div className="d-flex col-sm-9 flex-column vh-100 bg-secondary px-2">
        <ChatPanelContainer />
      </div>
      <ModalAlertNotifier />
    </div>
  </div>
);

export default App;
