import React from 'react';
import { Button } from 'reactstrap';
import PropTypes from 'prop-types';

const ChannelsPanelHeader = props => (
  <div className="flex-row text-white">
    Channels:{' '}
    <Button size="sm" onClick={props.handleToggleAddModal}>+</Button>
  </div>);

ChannelsPanelHeader.propTypes = {
  handleToggleAddModal: PropTypes.func.isRequired,
};

export default ChannelsPanelHeader;
