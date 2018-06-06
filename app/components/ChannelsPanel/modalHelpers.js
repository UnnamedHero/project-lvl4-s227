const isRequestFinished = (prevState, currentState) => {
  const stateChanged = prevState !== currentState;
  const requestPending = currentState === 'requested';
  return stateChanged && !requestPending;
};

export default isRequestFinished;
