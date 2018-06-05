// import action from store
import { Action } from '@ngrx/store';

import { IPerson, Person } from '../models/Person';

export interface PersonIdentifier {
  id: string;
}

// Define action types as namespaced strings in enum
export enum PeopleActionTypes {
  ADD_GUEST = '[People] ADD_GUEST',
  REMOVE_GUEST = '[People] REMOVE_GUEST',
  TOGGLE_ATTENDING = '[People] TOGGLE_ATTENDING',
  ADD_PERSON = '[People] ADD_PERSON',
  REMOVE_PERSON = '[People] REMOVE_PERSON',
}

// Define actions
export class AddPerson implements Action {
  readonly type = PeopleActionTypes.ADD_PERSON;

  constructor(public payload: Person) { }
}

export class RemovePerson implements Action {
  readonly type = PeopleActionTypes.REMOVE_PERSON;

  constructor(public payload: PersonIdentifier) { }
}

export class AddGuest implements Action {
  readonly type = PeopleActionTypes.ADD_GUEST;

  constructor(public payload: PersonIdentifier) { }
}

export class RemoveGuest implements Action {
  readonly type = PeopleActionTypes.REMOVE_GUEST;

  constructor(public payload: PersonIdentifier) { }
}

export class ToggleAttending implements Action {
  readonly type = PeopleActionTypes.TOGGLE_ATTENDING;

  constructor(public payload: PersonIdentifier) { }
}

// export union of all defined actions
export type PeopleActionsUnion
  = AddPerson
  | RemovePerson
  | AddGuest
  | RemoveGuest
  | ToggleAttending;
