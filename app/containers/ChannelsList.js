import gon from 'gon';
import { connect } from 'react-redux';
import Component from '../components/ChannelsList';

const Container = connect(
  (state) => {
    const props = {
      channels: gon.channels,      
    };
    return props;
  },  
)(Component);

export default Container;