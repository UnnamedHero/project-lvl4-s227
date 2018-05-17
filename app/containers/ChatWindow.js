import { connect } from 'react-redux';
import Component from '../components/ChatWindow';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

const Container = connect(mapStateToProps)(Component);

export default Container;
