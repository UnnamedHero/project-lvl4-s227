import gon from 'gon';
import { connect } from 'react-redux';
import Component from '../components/ChannelsList';

const mapStateToProps = () => {
  const props = {
    channels: gon.channels,
    currentChannelId: gon.currentChannelId,
  };
  return props;
};

const Container = connect(mapStateToProps)(Component);

export default Container;
