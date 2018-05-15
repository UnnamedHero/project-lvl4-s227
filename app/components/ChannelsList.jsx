import React from 'react';
import cn from 'classnames';

const ChannelsList = (props) => {
  const renderChannelsList = () => {
    const { channels, currentChannelId } = props;
    return channels.map((channel) => {
      const listClass = {
        'text-white-50': currentChannelId !== channel.id,
        'text-white': currentChannelId === channel.id,
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
