import { connect } from 'react-redux';
import Component from '../components/ChannelsList';

const mapStateToProps = ({ channelsList: { channels, currentChannelId } }) => {
  const props = {
    channels, currentChannelId,
  };
  return props;
};

const Container = connect(mapStateToProps)(Component);

export default Container;
