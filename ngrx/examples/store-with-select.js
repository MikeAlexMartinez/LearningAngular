import { Subject, BehaviorSubject } from 'rxjs';
import { scan, map, distinctUntilChanged } from 'rxjs/operators';

class Dispatcher extends Subject<any> {
  dispatch(value: any): void {
    this.next(value);
  }
}

class Store extends BehaviorSubject<any> {

  constructor (
    private dispatcher,
    private reducer,
    preMiddleware,
    postMiddleware,
    initialState = {}
  ) {
    super(initialState);
    this.dispatcher.pipe(
      preMiddleware,
      scan((state, action) => this.reducer(state, action), initialState),
      postMiddleware
    ).subscribe(state => super.next(state));
  }

  // Map makes it easy to select slice of state that will be needed for your
  // components. This is a simple helper function to make grabbing sections
  // of state more concise.
  select(key: string) {
    return this.pipe(
      map(state => state.key),
      distinctUntilChanged()
    );
  }

  // ...store implementation
}
// ...create store
// const store = new Store();

// utilizing the store select helper
// const subscriber = store
//   .select('person')
  // .subscribe(val => console.log('VALUE OF PERSON: ', val));
