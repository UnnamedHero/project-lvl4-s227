import React from 'react';
import ChannelsPanelContainer from './ChannelsPanelContainer';
import ChatPanel from './ChatPanel';

import AlertNotifier from './AlertNotifier';

const App = () => (
  <div className="container-fluid">
    <div className="d-flex vh-100">
      <div className="col-3 bg-dark vh-100">
        <ChannelsPanelContainer />
      </div>
      <div className="d-flex col-9 flex-column vh-100 bg-secondary">
        <ChatPanel />
        <AlertNotifier />
      </div>
    </div>
  </div>
);

export default App;
