import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

import { genId } from '../helper/id';

import * as s from '../selectors/selectors';
import { ADD_PERSON,
         ADD_GUEST,
         REMOVE_GUEST,
         REMOVE_PERSON,
         TOGGLE_ATTENDING } from '../constants/constants';
import { PersonListComponent } from './d-components/person-list/person-list.component';
import { PersonInputComponent } from './d-components/person-input/person-input.component';

@Component({
  selector: 'app-party-planner',
  templateUrl: './party-container.component.html',
  styleUrls: ['./party-container.component.scss']
})
export class PartyPlannerComponent implements OnInit/*, OnDestroy*/ {

  public model$;
  public percentAttendance$;
  // public filter$;
  // public people$;
  // public attending$;
  // public guests$;

  constructor (
    private _store: Store<any>
  ) { }

  ngOnInit() {
    // this.people$ = this._store.select('people');
    // Not required with async id
    // this.subscription = thisid
    //   .select('people')
    //   .subscribe(people => {id
    //     this.people$ = people;
    //   });

    // this.filter$ = this._store.select('partyFilter');
    // this.attending$ = this.people$.map(p => p.filter(person => person.attending));
    // this.guests$ = this.people$
    //   .map(p => p.map(person => person.guests)
    //     .reduce((acc, curr) => acc + curr, 0)
    //   );

    this.model$ = combineLatest(
      this._store.select('people'),
      this._store.select('partyFilter')
    ).pipe(
      s.partyModel()
    );

    this.percentAttendance$ = this._store.pipe(s.percentAttending());
  }

  // all state-changing actions get dispatched to and handles by reducers
  addPerson(name) {
    this._store.dispatch({type: ADD_PERSON, payload: {id: genId()}});
  }

  addGuest(id) {
    this._store.dispatch({type: ADD_GUEST, payload: id});
  }

  removeGuest(id) {
    this._store.dispatch({type: REMOVE_GUEST, payload: id});
  }

  removePerson(id) {
    this._store.dispatch({type: REMOVE_PERSON, payload: id});
  }

  toggleAttending(id) {
    this._store.dispatch({type: TOGGLE_ATTENDING, payload: id});
  }

  /**
   * if you do not use async pipe and create manual subscription
   * always remember to unsubscribe in ngOnDestroy
   */
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
