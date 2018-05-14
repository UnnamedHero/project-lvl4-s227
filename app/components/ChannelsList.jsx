import React from 'react';
import cn from 'classnames';

const ChannelsList = (props) => {
  const renderChannelsList = () => {
    const { channels, currentChannel } = props;
    return channels.map((channel) => {
      const listClass = {
        'text-white-50': currentChannel !== channel.id,
        'text-white': currentChannel === channel.id,
      };
      return <li key={channel.id} className={cn(listClass)}>{channel.name}</li>;
    });
  };
  return (
    <div>
      <p>Channels:</p>
      <ul>
        {renderChannelsList()}
      </ul>
    </div>
  );
};

export default ChannelsList;
