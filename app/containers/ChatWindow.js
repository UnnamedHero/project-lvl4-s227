import { connect } from 'react-redux';
import Component from '../components/ChatWindow';
import * as actionCreators from '../actions';
import { getCurrentChannelMessagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const props = {
    messages: getCurrentChannelMessagesSelector(state),
  };
  return props;
};

const Container = connect(mapStateToProps, actionCreators)(Component);

export default Container;
