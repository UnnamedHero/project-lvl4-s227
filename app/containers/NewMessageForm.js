import gon from 'gon';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import Component from '../components/NewMessageForm';
import * as actionCreators from '../actions';

const mapStateToProps = () => {
  const props = {
    currentChannelId: gon.currentChannelId,
    userName: Cookie.get('userName'),
  };
  return props;
};

const Container = connect(mapStateToProps, actionCreators)(Component);

export default Container;
