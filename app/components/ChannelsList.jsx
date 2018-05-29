import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import cn from 'classnames';
import connect from '../connect';

const mapStateToProps = ({ channels: { channelsList, currentChannelId } }) => {
  const props = {
    channelsList, currentChannelId,
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
    const { channelsList, currentChannelId } = this.props;
    return channelsList.map((channel) => {
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
