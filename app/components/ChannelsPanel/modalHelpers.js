const isRequestSuccess = (prevState, currentState) => {
  const stateChanged = prevState !== currentState;
  const requestSuccess = currentState === 'success';
  return stateChanged && requestSuccess;
};

export default isRequestSuccess;
