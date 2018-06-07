import React from 'react';
import { Field, reduxForm, propTypes as reduxPropTypes } from 'redux-form';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import InputField from '../InputField';
import isRequestFinished from './modalHelpers';

@reduxForm({ form: 'ModalEditor' })
class ModalChannelNameEditor extends React.Component {
  static defaultProps = {
    isValidInput: true,
    initialValues: {},
    enableReinitialize: false,
  };

  static propTypes = {
    ...reduxPropTypes,
    id: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    onSubmitHandler: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    onCloseHandler: PropTypes.func.isRequired,
    requestState: PropTypes.oneOf(['none', 'requested', 'failure', 'success']).isRequired,
    enableReinitialize: PropTypes.bool,
    initialValues: PropTypes.object,
    isValidInput: PropTypes.bool,
  }

  componentDidUpdate(prevProps) {
    if (isRequestFinished(prevProps.requestState, this.props.requestState)) {
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
