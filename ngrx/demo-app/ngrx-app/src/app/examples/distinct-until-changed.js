const { Observable } = require('rxjs');
const { distinctUntilChanged } = require('rxjs/operators');

// only output distinct values, based on the last emitted value
const myArrayWithDuplicatesInARow = new Observable
  .from([1,1,2,2,3,1,2,3]);

const distinctSub = myArrayWithDuplicatesInARow
  .distinctUntilChanged()
  .subscribe(val => console.log('DISTINCT SUB:', val));

const nonDistinctSub = myArrayWithDuplicatesInARow
  // .distinctUntilChanged()
  .subscribe(val => console.log('NON DISTINCT SUB:', val));

const sampleObject = { name: 'Test' };

const myArrayWithDuplicateObjects = new Observable
  .from([sampleObject, sampleObject, sampleObject])
  .distinctUntilChanged()
  .subscribe(val => console.log('DISTINCT OBJECTS: ', val));