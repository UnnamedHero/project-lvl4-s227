import React from 'react';
// import { Field, reduxForm } from 'redux-form';
import { Modal, ModalHeader, ModalBody, Form, Input, Button } from 'reactstrap';
import cn from 'classnames';
import connect from '../connect';


const ModalEditor = (props) => {
  const {
    isOpen,
    headerLabel,
    submitLabel, cancelLabel,
    submitHandler, cancelHandler,
    modalDefaultValue,
  } = props;
  const buttonClasses = {
    btn: true,
    'btn-primary': true,
    // disabled: !canSend,
  };
  return (
    <Modal isOpen={isOpen} toggle={cancelHandler} backdrop="static">
      <ModalHeader toggle={cancelHandler}>{headerLabel}</ModalHeader>
      <ModalBody>
        <Form onSubmit={this.props.handleSubmit(submitHandler)} className="d-flex">
          <Input name="modalText" type="text" required value={modalDefaultValue || ''} />
          <Button type="submit" className={cn(buttonClasses)}>{submitLabel}</Button>
          <Button className="btn btn-secondary" onClick={cancelHandler}>{cancelLabel}</Button>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default connect()(ModalEditor);

// export default reduxForm({
//   form: 'ModalEditor',
// })(ModalEditor);
