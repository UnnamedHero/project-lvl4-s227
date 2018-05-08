import React from 'react';

export default class ChannelsList extends React.Component {
  renderChannelsList() {
    const { channels } = this.props.gon;
    return channels.map(channel => 
(<a key={channel.id} href='#' className='list-group-item list-group-item-action'>{channel.name}</a>));
  }

  render() {    
    return (
<div className='list-group'>
  {this.renderChannelsList()}
</div>
    );
  }
};