import { connect } from 'react-redux';
import Component from '../components/AlertNotifier';
import * as actionCreators from '../actions';

const Container = connect(({ notification }) => {
  const props = {
    ...notification,
  };
  return props;
}, actionCreators)(Component);

export default Container;
