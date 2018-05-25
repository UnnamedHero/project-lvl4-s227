import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import cn from 'classnames';
import ChannelsListEditor from './ChannelsListEditor';
import connect from '../connect';

const mapStateToProps = ({ channelsList: { channels, currentChannelId } }) => {
  const props = {
    channels, currentChannelId,
  };
  return props;
};

@connect(mapStateToProps)
class ChannelsList extends React.Component {
  state = { isEditorOpen: false }

  onChannelClick = id => () => {
    const { currentChannelId, changeCurrentChannel } = this.props;
    if (currentChannelId === id) {
      return;
    }
    changeCurrentChannel({ id });
  }

  toggleEditor = () => {
    this.setState({ isEditorOpen: !this.state.isEditorOpen });
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
        <span>
          Channels:
          <Button color="link" onClick={this.toggleEditor}>edit</Button>
          <ChannelsListEditor isOpen={this.state.isEditorOpen} toggle={this.toggleEditor} />
        </span>
        <ListGroup>
          {this.renderChannelsList()}
        </ListGroup>
      </div>
    );
  }
}

export default ChannelsList;
