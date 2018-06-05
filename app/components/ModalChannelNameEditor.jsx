import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

import InputField from './InputField';

@reduxForm({
  form: 'ModalEditor',
})
class ModalChannelNameEditor extends React.Component {
  static defaultProps = {
    isValidInput: true,
  };
  // static getDerivedStateFromProps(nextProps) {
  //   return { errorPopover: has(nextProps.inputState, 'ModalEditor.syncErrors') };
  // }

  // state = { errorPopover: false };

  // componentDidUpdate(prevProps) {
  //   const { requestType, closeOnSuccess, cancelHandler } = this.props;
  //   const prevState = prevProps.requestStates[requestType];
  //   const currState = this.props.requestStates[requestType];
  //   if (prevState !== currState && currState !== 'requested') {
  //     this.props.reset();
  //     if (closeOnSuccess) {
  //       cancelHandler();
  //     }
  //   }
  // }

  render() {
    const {
      // isOpen,
      // headerLabel,
      handleToggleModal,
      handleSubmit,
      validate,
      isValidInput,
      onSubmitHandler,
      requestState,
      id,
      // inputState,
      // requestStates, requestType,
    } = this.props;
    console.log(requestState);
    const isRequestPending = requestState === 'requested';
    // const hasError = has(inputState, 'ModalEditor.syncErrors');
    // const errorText = hasError ? inputState.ModalEditor.syncErrors.modalEditorInput.error : null;
    // const canSend = requestStates[requestType] !== 'requested';
    return (
      <Modal isOpen fade={false} backdrop="static">
        <ModalHeader>Add channel</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="d-flex">
            <Field name="modalInput" id={id} canSend validate={validate} component={InputField} />
            <button type="submit" className="btn btn-primary" disabled={!isValidInput || isRequestPending} >Add</button>
            <Button color="secondary" onClick={handleToggleModal} disabled={isRequestPending}>Cancel</Button>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalChannelNameEditor;
