import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import cn from 'classnames';

const ChannelsList = (props) => {
  const renderChannelsList = () => {
    const { channels, currentChannelId, changeCurrentChannel } = props;
    return channels.map((channel) => {
      const isCurrentChannel = currentChannelId === channel.id;
      const itemClass = {
        'text-white': isCurrentChannel,
        'text-body': !isCurrentChannel,
        active: isCurrentChannel,
      };
      const changeChannel = isCurrentChannel ?
        null :
        changeCurrentChannel.bind(null, { id: channel.id });
      return (
        <ListGroupItem key={channel.id} tag="button" action onClick={changeChannel} className={cn(itemClass)}>
          {channel.name}
        </ListGroupItem>);
    });
  };
  return (
    <div>
      <span>Channels:</span>
      <ListGroup>
        {renderChannelsList()}
      </ListGroup>
    </div>
  );
};

export default ChannelsList;
