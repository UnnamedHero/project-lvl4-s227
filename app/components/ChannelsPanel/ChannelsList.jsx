import React from 'react';
import { ListGroup, ListGroupItem, Button, ButtonGroup } from 'reactstrap';
import cn from 'classnames';
import PropTypes from 'prop-types';

class ChannelsList extends React.Component {
  static propTypes = {
    editModeOn: PropTypes.bool.isRequired,
    channelsList: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      removable: PropTypes.bool.isRequired,
    })).isRequired,
    currentChannelId: PropTypes.number.isRequired,
    handleOnChannelClick: PropTypes.func.isRequired,
    onRemoveClickHandler: PropTypes.func.isRequired,
    onRenameClickHandler: PropTypes.func.isRequired,
  }

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

  renderChannelEditButtons(channel) {
    if (!channel.removable) {
      return null;
    }
    const { onRemoveClickHandler, onRenameClickHandler } = this.props;

    return (
      <ButtonGroup size="sm" >
        <Button color="primary" onClick={onRenameClickHandler(channel)}>ren</Button>
        <Button color="danger" onClick={onRemoveClickHandler(channel)}>del</Button>
      </ButtonGroup>
    );
  }

  renderChannelsList = () => {
    const { channelsList, editModeOn } = this.props;
    return channelsList.map((channel) => {
      const itemProps = this.makeItemProps(channel);
      return (
        <ListGroupItem key={channel.id} {...itemProps}>
          {channel.name}
          { editModeOn && this.renderChannelEditButtons(channel) }
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
