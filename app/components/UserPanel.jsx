import React from 'react';
import connect from '../connect';

const mapStateToProps = (state) => {
  const props = {
    userName: state.user.name,
  };
  return props;
};

const UserPanel = props => <p>Welcome, {props.userName}!</p>;

export default connect(mapStateToProps)(UserPanel);
