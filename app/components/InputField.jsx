import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import cn from 'classnames';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  static defaultProps = {
    id: null,
    isRequestPending: false,
    meta: {},
    type: 'input',
    input: {},
  }

  static propTypes = {
    id: PropTypes.string,
    isRequestPending: PropTypes.bool,
    input: PropTypes.object,
    type: PropTypes.string,
    meta: PropTypes.object,
  }

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
    this.inputEl.current.focus({ preventFocus: true });
  }

  render() {
    const {
      id, input, type, meta,
    } = this.props;
    const animationClass = {
      'request-sending': meta.isRequestPending,
    };
    const disabledProp = {
      disabled: meta.isRequestPending,
    };
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <span className={cn(animationClass)}>#</span>
          </div>
        </div>
        <input ref={this.inputEl} {...input} id={id} required type={type} className="form-control" autoComplete="off" {...disabledProp} />
        { meta.error &&
        <Popover placement="bottom" isOpen target={id}>
          <PopoverHeader className="bg-danger text-white">Error!</PopoverHeader>
          <PopoverBody>{meta.error}</PopoverBody>
        </Popover> }
      </div>
    );
  }
}

export default InputField;
