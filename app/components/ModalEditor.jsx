import React from 'react';
import has from 'lodash/has';
import { Field, reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import connect from '../connect';
import InputField from './InputField';


const mapStateToProps = (state) => {
  const props = {
    inputState: state.form,
    requestStates: state.requestStates,
  };
  return props;
};

@connect(mapStateToProps)
class ModalEditor extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    return { errorPopover: has(nextProps.inputState, 'ModalEditor.syncErrors') };
  }

  state = { errorPopover: false };

  componentDidUpdate(prevProps) {
    const { requestType, closeOnSuccess, cancelHandler } = this.props;
    const prevState = prevProps.requestStates[requestType];
    const currState = this.props.requestStates[requestType];
    if (prevState !== currState && currState === 'success') {
      this.props.reset();
      if (closeOnSuccess) {
        cancelHandler();
      }
    }
  }

  modalSubmit = (values) => {
    this.props.submitHandler(values);
  }

  render() {
    const {
      isOpen,
      headerLabel,
      submitLabel, cancelLabel,
      cancelHandler,
      handleSubmit,
      validate,
      inputState,
      requestStates, requestType,
    } = this.props;
    const hasError = has(inputState, 'ModalEditor.syncErrors');
    const errorText = hasError ? inputState.ModalEditor.syncErrors.modalEditorInput.error : null;
    const canSend = requestStates[requestType] !== 'requested';
    return (
      <Modal isOpen={isOpen} fade={false} toggle={cancelHandler} backdrop="static">
        <ModalHeader>{headerLabel}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(this.modalSubmit)} className="d-flex">
            <Field id="PopoverTarget" name="modalEditorInput" canSend={canSend} validate={validate} component={InputField} />
            <button type="submit" className="btn btn-primary" disabled={hasError || !canSend}>{submitLabel}</button>
            <Button color="secondary" disabled={!canSend} onClick={cancelHandler}>{cancelLabel}</Button>
          </form>
          <Popover placement="top" isOpen={this.state.errorPopover} target="PopoverTarget">
            <PopoverHeader className="bg-danger text-white">Error!</PopoverHeader>
            <PopoverBody>{errorText}</PopoverBody>
          </Popover>
        </ModalBody>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'ModalEditor',
})(ModalEditor);
