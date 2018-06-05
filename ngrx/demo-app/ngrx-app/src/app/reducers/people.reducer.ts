import { PeopleActionTypes,
  PeopleActionsUnion} from '../actions/people.actions';

import { Person } from '../models/Person';

const initialState = [];

// private reducer to be used within the people reducer
function details (
  state: Person,
  action: PeopleActionsUnion
) {
  switch (action.type) {
    case PeopleActionTypes.ADD_GUEST:
    if (state.id === action.payload.id) {
      return Object.assign({}, state, {guests: state.guests + 1});
      }
      return state;
    case PeopleActionTypes.REMOVE_GUEST:
      if (state.id === action.payload.id) {
        return Object.assign({}, state, {guests: state.guests - 1});
      }
      return state;
    case PeopleActionTypes.TOGGLE_ATTENDING:
    if (state.id === action.payload.id) {
        return Object.assign({}, state, {attending: !state.attending});
      }
      return state;
    default:
      return state;
    }
  }

// Remember to avoid mutation within reducers
export function people (
  state: Person[] = initialState,
  action: PeopleActionsUnion
) {
  switch (action.type) {
    case PeopleActionTypes.ADD_PERSON:
      return [
        ...state,
        Object.assign({}, action.payload)
      ];
    case PeopleActionTypes.REMOVE_PERSON:
      return state.filter(person => person.id !== action.payload.id);

    // to shorten our case statements, delegate detail to second private reducer
    case PeopleActionTypes.ADD_GUEST:
    case PeopleActionTypes.REMOVE_GUEST:
    case PeopleActionTypes.TOGGLE_ATTENDING:
      return state.map(person => details(person, action));

    // always have a default return of previous state when action is not relevant
    default:
      return state;
  }
}
