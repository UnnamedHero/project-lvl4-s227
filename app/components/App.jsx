import React from 'react';
import ChannelsListContainer from '../containers/ChannelsList';
// import UserPanelContainer from '../containers/UserPanel';
import UserPanel from './UserPanel';
import ChatWindowContainer from '../containers/ChatWindow';
import NewMessageForm from '../containers/NewMessageForm';
import AlertNotifierContainer from '../containers/AlertNotifier';

const App = () => (
  <div className="container-fluid">
    <div className="row d-flex vh-100">
      <div className="col-2 d-flex flex-column bg-dark text-white-50 vh-100">
        <div>
          <UserPanel />
        </div>
        <div className="scrollable">
          <ChannelsListContainer />
        </div>
      </div>
      <div className="d-flex col-10 flex-column justify-content-between vh-100 bg-secondary">
        <div className="scrollable word-wrap-bw">
          <ChatWindowContainer />
        </div>
        <div>
          <AlertNotifierContainer />
          <NewMessageForm />
        </div>
      </div>
    </div>
  </div>
);

export default App;
