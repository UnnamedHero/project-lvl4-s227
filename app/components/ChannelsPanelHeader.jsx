import React from 'react';
import { Button } from 'reactstrap';

class ChannelsPanelHeader extends React.Component {
  render() {
    return (
      <div>
        <div className="flex-column">
          <Button outline color="primary" size="sm">Toggle edit mode</Button>
          <div className="flex-row">
            Channels:{' '}
            <Button className="primary" size="sm">+</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChannelsPanelHeader;
