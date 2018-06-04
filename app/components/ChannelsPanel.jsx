import React from 'react';
import ChannelsPanelHeader from './ChannelsPanelHeader';
import ChannelsList from './ChannelsList';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    channelsList: state.channels.channelsList,
    defaultChannelId: state.channels.defaultChannelId,
    currentChannelId: state.channels.currentChannelId,
  };
  return props;
};

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
