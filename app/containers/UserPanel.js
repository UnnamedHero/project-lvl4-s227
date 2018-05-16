import { connect } from 'react-redux';
import Component from '../components/UserPanel';

const Container = connect((state) => {
  const props = {
    userName: state.user.name,
  };
  return props;
})(Component);

export default Container;
