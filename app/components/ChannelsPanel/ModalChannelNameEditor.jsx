import React from 'react';
import { Field, reduxForm, propTypes as reduxPropTypes } from 'redux-form';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import InputField from '../InputField';
import isRequestSuccess from './modalHelpers';
import { requestStateType } from '../../types';

@reduxForm({ form: 'ModalEditor' })
class ModalChannelNameEditor extends React.Component {
  static defaultProps = {
    initialValues: {},
    enableReinitialize: false,
  };

  static propTypes = {
    ...reduxPropTypes,
    id: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCloseHandler: PropTypes.func.isRequired,
    requestState: requestStateType.isRequired,
    enableReinitialize: PropTypes.bool,
    initialValues: PropTypes.object,
  }

  componentDidUpdate(prevProps) {
    if (isRequestSuccess(prevProps.requestState, this.props.requestState)) {
      this.props.onCloseHandler();
    }
  }

  render() {
    const {
      submitLabel,
      onCloseHandler,
      handleSubmit,
      validate,
      requestState,
      id,
    } = this.props;
    const isRequestPending = requestState === 'requested';

    return (
      <Modal isOpen fade={false} backdrop="static">
        <ModalHeader>{submitLabel} channel</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className="d-flex">
            <Field name="modalInput" id={id} validate={validate} component={InputField} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit} disabled={isRequestPending}>{submitLabel}</Button>
          <Button color="secondary" onClick={onCloseHandler} disabled={isRequestPending}>Cancel</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalChannelNameEditor;
