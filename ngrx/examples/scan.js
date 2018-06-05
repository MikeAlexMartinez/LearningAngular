const { Subject } = require('rxjs');
const { scan } = require('rxjs/operators');

const testSubject = new Subject();
// basic scan example, sum over time starting with zero
const basicScan = testSubject.pipe(
  scan((acc, curr) => acc + curr, 0)
);

// log accumulated values
const basicUnsubscribe = basicScan.subscribe(val => console.log('Accumulated total: ', val));
// pass value into our test subject, adding to the current sum
testSubject.next(1); // 1
testSubject.next(2); // 3
testSubject.next(3); // 6

// const testSubjectTwo = new Subject();
// // scan example building an object over time
// const objectScan = testSubjectTwo.scan((acc, curr) => Object.assign({}, acc, curr), {});
// // log accumulated values
// const objUnsubscribe = objectScan.scan(val => console.log('Accumulated object: ', val));
// // pass values inot our test subject, adding properties to object
// testSubjectTwo.next({name: 'Joe'});
// testSubjectTwo.next({age: 30});
// testSubjectTwo.next({favouriteFramework: 'Angular 2'});
