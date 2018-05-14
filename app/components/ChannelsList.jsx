import React from 'react';
// import cn from 'classnames';

export default class ChannelsList extends React.Component {
  renderChannelsList() {
    const { channels } = this.props;
    // const commonClasses = {
    //   'nav-item': true,
    // };
    return channels.map(channel => (<li key={channel.id}>{channel.name}</li>));
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderChannelsList()}
        </ul>
      </div>
    );
  }
}
