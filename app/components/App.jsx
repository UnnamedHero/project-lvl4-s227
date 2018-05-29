import React from 'react';
import ChannelsListHeader from './ChannelsListHeader';
import ChannelsListRenderer from './ChannelsListRenderer';
import UserPanel from './UserPanel';
import ChatWindow from './ChatWindow';
import NewMessageForm from './NewMessageForm';
import AlertNotifier from './AlertNotifier';

const App = () => (
  <div className="container-fluid">
    <div className="row d-flex vh-100">
      <div className="col-3 d-flex flex-column bg-dark text-white-50 vh-100">
        <div>
          <UserPanel />
        </div>
        <div>
          <ChannelsListHeader />
        </div>
        <div className="scrollable">
          <ChannelsListRenderer />
        </div>
      </div>
      <div className="d-flex col-9 flex-column justify-content-between vh-100 bg-secondary">
        <div className="scrollable word-wrap-bw">
          <ChatWindow />
        </div>
        <div>
          <AlertNotifier />
          <NewMessageForm />
        </div>
      </div>
    </div>
  </div>
);

export default App;
