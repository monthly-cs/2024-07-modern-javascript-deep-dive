/**
 * - 브라우저 환경에서도 person.last-name이 ReferenceError가 발생하는데? (브라우저 환경 != Chrome 개발자 도구?)
 * - name과 last가 정의되어 있으면 person[last-name]을 출력하면 undefined가 출력된다?
 */

// var last = 'hello';
// var name = 'name';

var person = {
  'last-name': '욱',
  1: 10,
};

console.log(person[last - name]); // last와 name이 정의되어 있으면 해당 부분에서 undefined 출력
// console.log(person.'last-name');

person[last - name];
person['last-name'];
