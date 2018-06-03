// Redux-style reducer
const person = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_INFO':
      return Object.assign({}, state, action.payload)
    default:
      return state;
  }
}

const infoAction = {
  type: 'ADD_INFO',
  payload: {
    name: 'Brian',
    framework: 'Angular'
  }
};
const anotherPersonInfo = person(undefined, infoAction);
console.log('***REDUX STYLE PERSON***: ', anotherPersonInfo);

// add another reducer
const hoursWorked = (state = 0, action) => {
  switch(action.type) {
    case 'ADD_HOUR':
      return state + 1;
    case 'SUBTRACT_HOUR':
      return state - 1;
    default:
      return state;
  }
}

// Combine Reducers Refresher
const myReducers = {person, hoursWorked};
const combineReducers = reducers => (state = {}, action) => {
  return Object.keys(reducers).reduce((nextState, key) => {
    nextState[key] = reducers[key](state[key], action);
    return nextState;
  }, {});
};
/**
 * This gets us most of the way there, but really what we want is for the 
 * value of firstState and secondState to accumulate as actions are
 * dispatched over time. Luckily, RxJS offer the perfect operator for this
 * scenario. (.scan)
 */
const rootReducer = combineReducers(myReducers);
const firstState = rootReducer(
  undefined, {
    type: 'ADD_INFO', 
    payload: { 
      name: 'Brian'
    }
  }
);
const secondState = rootReducer({
  hoursWorked: 10,
  person: {
    name: 'Joe'
  }
}, { type: 'ADD_HOUR' });
console.log('***FIRST STATE***: ', firstState);
console.log('***SECOND STATE***: ', secondState);
