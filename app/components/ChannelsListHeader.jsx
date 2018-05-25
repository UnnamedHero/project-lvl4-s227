import React from 'react';
import { Button } from 'reactstrap';
import ChannelsListEditor from './ChannelsListEditor';

class ChannelsListHeader extends React.Component {
  state = { isEditorOpen: false }

  toggleEditor = () => {
    this.setState({ isEditorOpen: !this.state.isEditorOpen });
  }

  render() {
    return (
      <span>
        Channels:
        <Button color="link" onClick={this.toggleEditor}>edit</Button>
        <ChannelsListEditor isOpen={this.state.isEditorOpen} toggle={this.toggleEditor} />
      </span>
    );
  }
}
export default ChannelsListHeader;
