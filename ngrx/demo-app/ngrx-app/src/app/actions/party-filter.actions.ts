// import action from store
import { Action } from '@ngrx/store';

// Define action types as namespaced strings in enum
export enum PartyFilterActionTypes {
  SHOW_ATTENDING = '[PartyFilter] SHOW_ATTENDING',
  SHOW_ALL = '[PartyFilter] SHOW_ALL',
  SHOW_WITH_GUESTS = '[PartyFilter] SHOW_WITH_GUESTS'
}

// Define actions
export class ShowAttending implements Action {
  readonly type = PartyFilterActionTypes.SHOW_ATTENDING;
}

export class ShowAll implements Action {
  readonly type = PartyFilterActionTypes.SHOW_ALL;
}

export class ShowWithGuests implements Action {
  readonly type = PartyFilterActionTypes.SHOW_WITH_GUESTS;
}

// export union of all defined actions
export type PartyFilterActionsUnion
  = ShowAttending
  | ShowAll
  | ShowWithGuests;
