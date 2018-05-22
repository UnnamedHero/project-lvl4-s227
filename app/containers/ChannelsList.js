import { connect } from 'react-redux';
import Component from '../components/ChannelsList';
import * as actionCreators from '../actions';

const mapStateToProps = ({ channelsList: { channels, currentChannelId } }) => {
  const props = {
    channels, currentChannelId,
  };
  return props;
};

const Container = connect(mapStateToProps, actionCreators)(Component);

export default Container;
