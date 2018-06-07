import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import cn from 'classnames';
import PropTypes from 'prop-types';

class InputField extends React.Component {
  static defaultProps = {
    id: null,
    requestPending: false,
  }

  static propTypes = {
    id: PropTypes.string,
    requestPending: PropTypes.bool,
    input: PropTypes.any, // eslint-disable-line
    type: PropTypes.any, // eslint-disable-line
    meta: PropTypes.any, // eslint-disable-line
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
    this.inputEl.current.focus();
  }

  render() {
    const {
      id, input, type, meta,
    } = this.props;
    const animationClass = {
      'request-sending': meta.requestPending,
    };
    const disabledProp = {
      disabled: meta.requestPending,
    };
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <div className="input-group-text">
            <span className={cn(animationClass)}>#</span>
          </div>
        </div>
        <input ref={this.inputEl} {...input} id={id} required type={type} className="form-control" {...disabledProp} />
        { meta.error &&
        <Popover placement="top" isOpen target={id}>
          <PopoverHeader className="bg-danger text-white">Error!</PopoverHeader>
          <PopoverBody>{meta.error}</PopoverBody>
        </Popover> }
      </div>
    );
  }
}

export default InputField;
