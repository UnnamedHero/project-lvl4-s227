import { connect } from 'react-redux';
import Component from '../components/NewMessageForm';
import * as actionCreators from '../actions';

const mapStateToProps = (state) => {
  const props = {
    currentChannelId: state.channelsList.currentChannelId,
    userName: state.user.name,
  };
  return props;
};

const Container = connect(mapStateToProps, actionCreators)(Component);

export default Container;
