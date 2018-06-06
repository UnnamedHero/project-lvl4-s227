import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import cn from 'classnames';

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.inputEl = React.createRef();
  }

  componentDidMount() {
    this.setInputFocus();
  }

  componentDidUpdate() {
    this.setInputFocus();
  }

  setInputFocus() {
    this.inputEl.current.focus();
  }

  render() {
    const {
      id, input, type,
      meta: { error, requestPending },
    } = this.props;
    const animationClass = {
      'request-sending': requestPending,
    };
    const disabledProp = {
      disabled: requestPending,
    };
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <span className={cn(animationClass)}>#</span>
          </div>
        </div>
        <input ref={this.inputEl} {...input} id={id} required type={type} className="form-control" {...disabledProp} />
        { error &&
        <Popover placement="top" isOpen target={id}>
          <PopoverHeader className="bg-danger text-white">Error!</PopoverHeader>
          <PopoverBody>{error}</PopoverBody>
        </Popover> }
      </div>
    );
  }
}

export default InputField;
