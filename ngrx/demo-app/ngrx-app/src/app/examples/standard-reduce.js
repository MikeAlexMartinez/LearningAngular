/*
You can think of reduce as a snowball rolling downhill. Each rotation (or iteration) mass is accumulated until we reach the bottom. Similarly with reduce, the returned value is passed to the next invocation of the supplied function until all values in the source array are exhausted. Let's see some examples to solidify this concept.
*/
const numberArray = [1,2,3];
/*
1.) accumulator: 1, current: 2
2.) accumulator: 3, current: 3
Final: 6
*/
const total = numberArray.reduce((accumulator, current) => accumulator + current);
console.log(`***TOTAL***: ${total}`);

//Reduce with objects
const personInfo = [{name: 'Joe'}, {age: 31}, {birthday: '1/1/1985'}];
/*
1.) accumulator: {name: 'Joe'}, current: {age: 31}
2.) accumulator: {name: 'Joe', age: 31}, current: {birthday: '1/1/1985'}
Final: {name: 'Joe', age: 31, birthday: '1'/1/1985'}
*/
const fullPerson = personInfo.reduce((accumulator, current) => {
 return Object.assign({}, accumulator, current)
});
console.log('***FULL PERSON***:', fullPerson);

//We can also provide an initial value for reduce as a second parameter
const personInfoStart = [{name: 'Joe'}, {age: 31}, {birthday: '1/1/1985'}];
/*
1.) accumulator: {favoriteLanguage: 'JavaScript'}, current: {name: 'Joe'}
2.) accumulator: {favoriteLanguage: 'JavaScript', name: 'Joe'}, current: {age: 31}
3.) accumulator: {favoriteLanguage: 'JavaScript', name: 'Joe', age: 31}, current: {birthday: '1/1/1985'}
Final: {favoriteLanguage: 'JavaScript', name: 'Joe', age: 31, birthday: '1/1/1985'}
*/
const fullPersonStart = personInfo.reduce((accumulator, current) => {
 return Object.assign({}, accumulator, current)
}, {favoriteLanguage: 'JavaScript'});
console.log('***FULL PERSON START:', fullPersonStart);