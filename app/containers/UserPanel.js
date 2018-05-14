import { connect } from 'react-redux';
import Cookie from 'js-cookie';
import Component from '../components/UserPanel';

const Container = connect(() => {
  const props = {
    userName: Cookie.get('userName'),
  };
  return props;
})(Component);

export default Container;
