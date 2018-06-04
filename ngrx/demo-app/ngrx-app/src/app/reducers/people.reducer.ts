import * as c from "../constants/constants";

const details = (state, action) => {
  switch(action.type) {
    case c.ADD_GUEST:
      if (state.id === action.payload) {
        return Object.assign({}, state, {guests: state.guests + 1});
      }
      return state;
    
    case c.REMOVE_GUEST:
      if (state.id === action.payload) {
        return Object.assign({}, state, {guests: state.guests -1});
      }
      return state;
    
    case c.TOGGLE_ATTENDING:
      if (state.id === action.payload) {
        return Object.assign({}, state, {attending: !state.attending});
      }
      return state;

    default:
      return state;
  }
}

// Remember to avoid mutation within reducers
export const people = (state = [], action) => {
  switch (action.type) {
    case c.ADD_PERSON:
      return [
        ...state,
        Object.assign({}, {id: action.payload.id, name: action.payload.name, guests: 0, attending: false})
      ];
    case c.REMOVE_PERSON:
      return state.filter(person => person.id !== action.payload);
    
    // to shorten our case statements, delegate detail to second private reducer
    case c.ADD_GUEST:
      return state.map(person => details(person, action));

    case c.REMOVE_GUEST:
      return state.map(person => details(person, action));

    case c.TOGGLE_ATTENDING:
      return state.map(person => details(person, action));

    // always have a default return of previous state when action is not relevant
    default:
      return state;
  }
}
