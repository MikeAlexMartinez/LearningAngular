const myArray = [1,2,3,4,5];
const myObservableArray = Rx.Observable.from(myArray);

const test = myObservableArray
    .map(val => val + 1)
  //this fails, let behaves differently than most operators
  //.let(val => val + 2)
  .subscribe(val => console.log('VALUE FROM ARRAY: ', val));
  
  
const letTest = myObservableArray
  .map(val => val + 1)
  //'let' me have the entire observable
  .let(obs => obs.map(val => val + 2))
  .subscribe(val => console.log('VALUE FROM ARRAY WITH let: ', val));

//let provides flexibility to add multiple operators to source observable then return
const letTestThree = myObservableArray
	.map(val => val + 1)
  //'let' me have the entire observable
  .let(obs => obs
    .map(val => val + 2)
    //also, just return evens
    .filter(val => val % 2 === 0)
  )
  .subscribe(val => console.log('let WITH MULTIPLE OPERATORS: ', val));

//pass in your own function to add operators to observable
const obsArrayPlusYourOperators = (yourAppliedOperators) => {
  return myObservableArray
    .map(val => val + 1)
    .let(yourAppliedOperators)
 };
const addTenThenTwenty = obs => obs.map(val => val + 10).map(val => val + 20);
const letTestFour = obsArrayPlusYourOperators(addTenThenTwenty)
	.subscribe(val => console.log('let FROM FUNCTION:', val));