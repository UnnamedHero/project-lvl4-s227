const isRequestSuccess = (prevState, currentState) =>
  prevState === 'requested' && currentState === 'success';

export default isRequestSuccess;
