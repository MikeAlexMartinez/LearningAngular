import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// import reducer and metaReducers from reducers folder
import { reducers, metaReducers } from './reducers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PartyPlannerComponent } from './party-container/party-container.component';
import { PersonInputComponent } from './party-container/d-components/person-input/person-input.component';
import { PersonListComponent } from './party-container/d-components/person-list/person-list.component';
import { FilterSelectComponent } from './party-container/d-components/filter-select/filter-select.component';
import { PartyStatsComponent } from './party-container/d-components/party-stats/party-stats.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    PartyPlannerComponent,
    PersonInputComponent,
    PersonListComponent,
    FilterSelectComponent,
    PartyStatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
        /**
     * StoreModule.forRoot is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store.
     */
    StoreRouterConnectingModule.forRoot({
      /*
        They stateKey defines the name of the state used by the router-store reducer.
        This matches the key defined in the map of reducers
      */
      stateKey: 'router',
    }),

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store DevTools',
      logOnly: environment.production,
    }),

    /**
     * EffectsModule.forRoot() is imported once in the root module and
     * sets up the effects class to be initialized immediately when the
     * application starts.
     *
     * See: https://github.com/ngrx/platform/blob/master/docs/effects/api.md#forroot
     */
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
