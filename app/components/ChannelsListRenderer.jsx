import React from 'react';
import connect from '../connect';
import ChannelsList from './ChannelsList';
import ChannelsListEditor from './ChannelsListEditor';

const mapStateToProps = (state) => {
  const props = {
    editMode: state.UI.editChannels,
  };
  return props;
};

const ChannelsListRenderer = ({ editMode }) => {
  const ListComponent = editMode ? ChannelsListEditor : ChannelsList;
  return <ListComponent />;
};

export default connect(mapStateToProps)(ChannelsListRenderer);
