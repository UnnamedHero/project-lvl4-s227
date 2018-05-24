import React from 'react';
import cn from 'classnames';

const InputField = (props) => {
  const animationClass = {
    'request-sending': !props.canSend,
  };
  const disabledProp = {
    disabled: !props.canSend,
  };
  return (
    <div className="input-group">
      <div className="input-group-prepend">
        <div className="input-group-text">
          <span className={cn(animationClass)}>#</span>
        </div>
      </div>
      <input {...props.input} id={props.id} required type="text" className="form-control" {...disabledProp} />
    </div>);
};

export default InputField;
