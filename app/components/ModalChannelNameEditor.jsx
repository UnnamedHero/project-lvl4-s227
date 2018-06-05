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

  componentDidUpdate(prevProps) {
    const prevRequestState = prevProps.requestState;
    const { requestState } = this.props;
    const stateChanged = prevRequestState !== requestState;
    const requestPending = requestState === 'requested';
    if (stateChanged && !requestPending) {
      this.props.onCloseHandler();
    }
  }

  render() {
    const {
      // isOpen,
      // headerLabel,
      onCloseHandler,
      handleSubmit,
      validate,
      isValidInput,
      onSubmitHandler,
      requestState,
      id,
      // inputState,
      // requestStates, requestType,
    } = this.props;

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
            <Button color="secondary" onClick={onCloseHandler} disabled={isRequestPending}>Cancel</Button>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalChannelNameEditor;
