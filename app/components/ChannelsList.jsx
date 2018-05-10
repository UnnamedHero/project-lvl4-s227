import React from 'react';
import cn from 'classnames';

export default class ChannelsList extends React.Component {
  renderChannelsList() {
    const { channels } = this.props;
    const commonClasses = {
      'list-group-item': true,
      'list-group-item-action': true,
    };
    return channels.map(channel => {
//      const channelClasses = { ...commonClasses, 'active': channel.id === currentChannelId };
      return (<a key={channel.id} href='#' className={cn(commonClasses)}>{channel.name}</a>);
    });
  }

  render() {    
    return (
<div className='list-group'>
  {this.renderChannelsList()}
</div>
    );
  }
};