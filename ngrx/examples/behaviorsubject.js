import Rx from 'rxjs';

class Store extends Rx.BehaviorSubject<any> {
  constructor(initialState: any) {
    // passes initialState to constructor of
    // Rx.BehaviourSubject
    super(initialState);
  }
}

const store = new Store('Initial Value!');

// add a few subscribers
const storeSubscriberOne = store.subscribe(val => {
  console.log('***STORE SUBSCRIBER ONE***', val);
});
const storeSubscriberTwo = store.subscribe(val => {
  console.log('***STORE SUBSCRIBER TWO***', val);
});

// For demonstration, manually publish values to store
store.next('FIRST STORE VALUE!');

// Add another subscriber after 'FIRST VALUE!' published
// output: ***STORE SUBSCRIBER THREE*** FIRST STORE VALUE!
const subscriberThree = store.subscribe(val => {
  console.log('***STORE SUBSCRIBER THREE***', val);
});
