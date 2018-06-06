import React from 'react';
import ChannelsPanelContainer from './ChannelsPanel/ChannelsPanelContainer';
import ChatPanelContainer from './ChatPanel/ChatPanelContainer';
import ModalAlertNotifier from './ModalAlertNotifier';

const App = () => (
  <div className="container-fluid px-0">
    <div className="d-flex vh-100">
      <div className="col-3 bg-dark vh-100">
        <ChannelsPanelContainer />
      </div>
      <div className="d-flex col-9 flex-column vh-100 bg-secondary">
        <ChatPanelContainer />
      </div>
      <ModalAlertNotifier />
    </div>
  </div>
);

export default App;
