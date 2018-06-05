// Third party Libs
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

// Store selectors
import * as s from '../selectors/selectors';

// import defined actions
import * as PeopleActions from '../actions/people.actions';
import * as PartyFilterActions from '../actions/party-filter.actions';

// Components
import { PersonListComponent } from './d-components/person-list/person-list.component';
import { PersonInputComponent } from './d-components/person-input/person-input.component';

// Models
import { Person } from '../models/Person';

// Helper functions
import { genId } from '../helper/id';

@Component({
  selector: 'app-party-planner',
  templateUrl: './party-container.component.html',
  styleUrls: ['./party-container.component.scss']
})
export class PartyPlannerComponent implements OnInit/*, OnDestroy*/ {

  public model$;
  public percentAttendance$;
  public filters = [
    {friendly: 'All', action: PartyFilterActions.PartyFilterActionTypes.SHOW_ALL},
    {
      friendly: 'Attending',
      action: PartyFilterActions.PartyFilterActionTypes.SHOW_ATTENDING
    },
    {
      friendly: 'Attending w/ Guests',
      action: PartyFilterActions.PartyFilterActionTypes.SHOW_WITH_GUESTS
    }
  ];
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
      map(([people, filter]) => {
        console.log(`total: ${people.length}`);
        return {
          total: people.length,
          people: people.filter(filter),
          attending: people.filter(person => person.attending).length,
          guests: people.reduce((acc, curr) => acc + curr.guests, 0)
        };
      })
    );

    this.percentAttendance$ = this._store.select('people').pipe(s.percentAttending());
  }

  updateFilter(action) {
    // actions defined in component (should probably lift logic to here)
    this._store.dispatch({type: action});
  }

  // all state-changing actions get dispatched to and handles by reducers
  addPerson(name) {
    const person = new Person({ name });
    this._store.dispatch(new PeopleActions.AddPerson(person));
  }

  addGuest(id) {
    this._store.dispatch(new PeopleActions.AddGuest({id}));
  }

  removeGuest(id) {
    this._store.dispatch(new PeopleActions.RemoveGuest({id}));
  }

  removePerson(id) {
    this._store.dispatch(new PeopleActions.RemovePerson({id}));
  }

  toggleAttending(id) {
    this._store.dispatch(new PeopleActions.ToggleAttending({id}));
  }

  /**
   * if you do not use async pipe and create manual subscription
   * always remember to unsubscribe in ngOnDestroy
   */
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
