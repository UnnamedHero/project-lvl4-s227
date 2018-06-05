import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import cn from 'classnames';

class ChannelsList extends React.Component {
  makeItemProps(channel) {
    const isCurrentChannel = this.props.currentChannelId === channel.id;
    return this.props.editModeOn ? {
      className: 'text-body d-flex justify-content-between align-items-center',
    } : {
      tag: 'button',
      action: true,
      onClick: this.props.handleOnChannelClick(channel.id),
      className: cn({
        'text-white': isCurrentChannel,
        'text-body': !isCurrentChannel,
        active: isCurrentChannel,
      }),
    };
  }

  renderChannelsList = () => {
    const { channelsList } = this.props;
    return channelsList.map((channel) => {
      const itemProps = this.makeItemProps(channel);
      return (
        <ListGroupItem key={channel.id} {...itemProps}>
          {channel.name}
        </ListGroupItem>);
    });
  }

  render() {
    return (
      <div>
        <ListGroup className="word-wrap-bw ">
          {this.renderChannelsList()}
        </ListGroup>
      </div>
    );
  }
}

export default ChannelsList;
