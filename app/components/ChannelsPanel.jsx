import React from 'react';
import ChannelsPanelHeader from './ChannelsPanelHeader';
import ChannelsList from './ChannelsList';

class ChannelsPanel extends React.Component {
  render() {
    return (
      <div>
        <div>
          <ChannelsPanelHeader />
        </div>
        <div>
          <ChannelsList />
        </div>
      </div>
      );
  }
}

export default ChannelsPanel;
