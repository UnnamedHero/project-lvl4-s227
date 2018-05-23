import React from 'react';
import has from 'lodash/has';
import { Field, reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import connect from '../connect';


const mapStateToProps = (state) => {
  const props = {
    inputState: state.form,
  };
  return props;
};

class ModalEditor extends React.Component {
  static getDerivedStateFromProps(nextProps) {
    return { errorPopover: has(nextProps.inputState, 'ModalEditor.syncErrors') };
  }

  state = { errorPopover: false };

  render() {
    const {
      isOpen,
      headerLabel,
      submitLabel, cancelLabel,
      submitHandler, cancelHandler,
      validate, inputState,
    } = this.props;
    const hasError = has(inputState, 'ModalEditor.syncErrors');
    const errorText = hasError ? inputState.ModalEditor.syncErrors.modalEditorInput.error : null;
    const inputFieldProps = {
      id: 'PopoverTarget',
      name: 'modalEditorInput',
      component: 'input',
      required: true,
      type: 'text',
      validate,
      className: 'form-control',
    };
    return (
      <Modal isOpen={isOpen} fade={false} toggle={cancelHandler} backdrop="static">
        <ModalHeader toggle={cancelHandler}>{headerLabel}</ModalHeader>
        <ModalBody>
          <form onSubmit={submitHandler} className="d-flex">
            <Field {...inputFieldProps} />
            <Button type="submit" color="success" disabled={hasError}>{submitLabel}</Button>
            <Button color="secondary" onClick={cancelHandler}>{cancelLabel}</Button>
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

export default connect(mapStateToProps)(reduxForm({
  form: 'ModalEditor',
})(ModalEditor));
