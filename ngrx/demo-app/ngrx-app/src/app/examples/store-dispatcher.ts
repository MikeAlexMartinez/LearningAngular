import Rx from 'rxjs';

/**
 * SUBSCRIBING TO A SUBJECT
 */

// create a subject
const mySubject = new Rx.Subject();

// add subscribers
const subscriberOne = mySubject.subscribe(val => {
  console.log('***SUBSCRIBER ONE***', val);
});

const subscriberTwo = mySubject.subscribe(val => {
  console.log('***SUBSCRIBER TWO***', val);
});

// publish values to observers of subject
mySubject.next('FIRST VALUE!');
mySubject.next('SECOND VALUE!');

/**
 * EXTENDING SUBJECT AS A DISPATCHER
 */

// Inherit from subject
class Dispatcher extends Rx.Subject<any> {
  dispatch(value: any): void {
    this.next(value);
  }
}

// create a dispatcher (just a subject with wrapped next method)
const dispatcher = new Dispatcher();

// add subscribers
const subscriberThree = dispatcher.subscribe(val => {
  console.log('***SUBSCRIBER 3***', val);
});

const subscriberFour = dispatcher.subscribe(val => {
  console.log('***SUBSCRIBER 4***', val);
});

dispatcher.dispatch('FIRST DISPATCHED VALUE');
dispatcher.dispatch('SECOND DISPATCHED VALUE');
