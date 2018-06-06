import React from 'react';
import cn from 'classnames';
import { Button } from 'reactstrap';

const ChannelsPanelHeader = (props) => {
  const { editModeOn, handleToggleEditMode, handleToggleAddModal } = props;
  const addButtonClasses = {
    primary: true,
    invisible: !editModeOn,
  };
  return (
    <div>
      <div className="flex-column">
        <Button outline={!editModeOn} color="primary" size="sm" onClick={handleToggleEditMode}>
          Toggle edit mode
        </Button>
        <div className="flex-row">
          Channels:{' '}
          <Button className={cn(addButtonClasses)} size="sm" onClick={handleToggleAddModal}>+</Button>
        </div>
      </div>
    </div>
  );
};

export default ChannelsPanelHeader;
