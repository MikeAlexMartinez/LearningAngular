export const RESET_STATE = 'RESET_STATE';

const INIT = '__NOT_A_REAL_ACTION__';

export const reset = (reducer) => {
  let initialState = reducer(undefined, {type: INIT});
  return function (state, action) {
    if (action.type === RESET_STATE) {
      return initialState;
    }
    let nextState = reducer(state, action);

    return nextState;
  }
}
