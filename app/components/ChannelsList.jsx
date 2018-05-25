import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ channelsList: { channels, currentChannelId } }) => {
  const props = {
    channels, currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  onChannelClick = id => () => {
    const { currentChannelId, changeCurrentChannel } = this.props;
    if (currentChannelId === id) {
      return;
    }
    changeCurrentChannel({ id });
  }

  renderChannelsList = () => {
    const { channels, currentChannelId } = this.props;
    return channels.map((channel) => {
      const isCurrentChannel = currentChannelId === channel.id;
      const itemClass = {
        'text-white': isCurrentChannel,
        'text-body': !isCurrentChannel,
        active: isCurrentChannel,
      };
      return (
        <ListGroupItem key={channel.id} tag="button" action onClick={this.onChannelClick(channel.id)} className={cn(itemClass)}>
          {channel.name}
        </ListGroupItem>);
    });
  }

  render() {
    return (
      <div>
        <ListGroup className="word-wrap-bw">
          {this.renderChannelsList()}
        </ListGroup>
      </div>
    );
  }
}

export default ChannelsList;
