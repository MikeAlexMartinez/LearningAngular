const Rx = require('rxjs');

// Create an observable that emits a value every second
const myInterval = Rx.Observable.interval(1000);
// Create an observable that emits immediately, then every 5 seconds
const myTimer = Rx.Observable.timer(0, 5000);
// Every time interval emits, also get latest from timer and add the two values
const latest = myInterval
  .withLatestFrom(myTimer)
  .map(([interval, timer]) => {
    console.log(`Latest Interval: ${interval}`);
    console.log(`Latest timer: ${timer}`);
    return interval + timer;
  });

// log total
const subscribe = latest.subscribe(val => console.log(`Total: ${val}`));
