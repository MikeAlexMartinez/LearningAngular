const Rx = require('rxjs');

// timerOne emits first value at 1s then every 4s
const timerOne = Rx.Observable.timer(1000, 4000);
// timerTwo emits first value at 2s then every 4s
const timerTwo = Rx.Observable.timer(1000, 4000);
// timerThree emits first value at 3s then every 4s
const timerThree = Rx.Observable.timer(1000, 4000);

// when one timer emits, emit the latest values from each
// timer as an array
const combined = Rx.Observable.combineLatest(
  timerOne,
  timerTwo,
  timerThree
);

const subscribe = combined.subscribe(latestValue => {
  // grab latest emitted values for timers one, two and three
  const [timerValOne, timerValTwo, timerValThree] = latestValues;
  /*
  	Example:
    timerOne first tick: 'Timer One Latest: 1, Timer Two Latest:0, Timer Three Latest: 0
    timerTwo first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 0
    timerThree first tick: 'Timer One Latest: 1, Timer Two Latest:1, Timer Three Latest: 1
  */

  console.log(
    `Timer One Latest: ${timerValOne}, 
    Timer Two Latest: ${timerValTwo}, 
    Timer Three Latest: ${timerValThree}`
  );
});

// combineLatest also takes an optional projection function
const combinedProject = Rx.Observable
  .combineLatest(
    timerOne,
    timerTwo,
    timerThree,
    (one, two, three) => {
      return `Timer One (Proj) Latest: ${one}, 
              Timer Two (Proj) Latest: ${two}, 
              Timer Three (Proj) Latest: ${three}`;
    }
  );

// log values
const subscribeCp = combinedProject.subscribe(latestValues => console.log(latestValues));
