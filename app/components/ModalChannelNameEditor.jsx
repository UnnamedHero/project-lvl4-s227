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
      submitLabel,
      onCloseHandler,
      handleSubmit,
      validate,
      isValidInput,
      onSubmitHandler,
      requestState,
      id,
    } = this.props;
    const isRequestPending = requestState === 'requested';

    return (
      <Modal isOpen fade={false} backdrop="static">
        <ModalHeader>{submitLabel} channel</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="d-flex">
            <Field name="modalInput" id={id} canSend validate={validate} component={InputField} />
            <button type="submit" className="btn btn-primary" disabled={!isValidInput || isRequestPending} >{submitLabel}</button>
            <Button color="secondary" onClick={onCloseHandler} disabled={isRequestPending}>Cancel</Button>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default ModalChannelNameEditor;
