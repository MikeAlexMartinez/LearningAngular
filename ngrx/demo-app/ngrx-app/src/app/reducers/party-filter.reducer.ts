import { PartyFilterActionTypes,
  PartyFilterActionsUnion} from '../actions/party-filter.actions';

import { Person } from '../models/Person';

export type FilterFn = (arg: Person) => boolean;

// return all people
const initialState = person => true;

export function reducer(
  state: FilterFn = initialState,
  action: PartyFilterActionsUnion
): FilterFn {
  switch (action.type) {
    case PartyFilterActionTypes.SHOW_ATTENDING:
      return person => person.attending;
    case PartyFilterActionTypes.SHOW_ALL:
      return person => true;
    case PartyFilterActionTypes.SHOW_WITH_GUESTS:
      return person => person.guests > 0;
    default:
      return person => true;
  }
}
