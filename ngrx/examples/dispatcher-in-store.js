import Rx from 'rxjs';
import { scan } from 'rxjs/operators';

/**
 * All actions should pass through pipeline before newly calculated
 * state is passed to store
 * 1). Dispatched Action
 * 2). Pre-Middleware
 * 3). Reducers (return new State)
 * 4). Post-Middleware
 * 5). store.next(newState)
 */

class Dispatcher extends Rx.Subject<any> {
  dispatch(value: any): void {
    this.next(value);
  }
}

const premiddleware = (val) => val;
const postmiddleware = (val) => val;

class Store extends Rx.BehaviorSubject<any> {
  constructor (
    private dispatcher: Dispatcher,
    private reducer,
    initialState
  ) {
    super(initialState);
    /**
     * All dispatched actions pass through action pipeline
     * before new state reaches store
     */
    this.dispatcher.pipe(
      premiddleware,
      scan((state, action) => this.reducer(state, action), initialState),
      postmiddleware,
    ).subscribe(state => super.next(state));
  }

  // delegate store.dispatch first through dispatched action pipeline
  dispatch(value) {
    this.dispatcher.dispatch(value);
  }

  // override store next to allow direct subscription to action streams
  // by store
  next(value) {
    this.dispatcher.dispatch(value);
  }
}

// const d = new Dispatcher();
// const store = new Store(d, 'INITIAL STATE');

// const subscriber = store.subscribe(val => console.log(`VALUE FROM STORE: ${val}`));

/**
 * All dispatched actions first flow through action pipeline, calculating
 * new state which is then passed to the store. To recap, our ideal
 * behaviour:
 * dispatched action -> pre-middleware -> reducers -> post-middeware ->
 * store.next(newState)
 */

// both of these methods are the same behind the scenes
// d.dispatch('DISPATCHED VALUE!');
// store.dispatch('ANOTHER DISPATCHED VALUE!');

// const actionStream$ = new Rx.Subject<any>();
// /**
//  * Overiding store next method allows us to subscribe store directly to
//  * action streams, providing same behaviour as manually calling
//  * store.dispatch or dispatcher.dispatch.
//  */
// actionStream$.subscribe(store);
// actionStream$.next('NEW ACTION');
