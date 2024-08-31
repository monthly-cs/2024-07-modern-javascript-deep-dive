# 6주차 발표 자료

# 27장 배열
## 27.1 배열이란?


```js
typeof arr // object
```

- 자바스크립트에 배열이라는 타입은 존재하지 않는다. 배열은 객체 타입이다.

| 구분 | 객체 | 배열 |
|----|----|----|
| 구조 | 프로퍼티 키와 프로퍼티 값 | 인덱스와 요소 |
| 값의 참조 | 프로퍼티 키 | 인덱스 |
| 값의 순서 | X | O |
| length 프로퍼티 | X | O |

- 자바스크립트의 Array는 Object의 특별한 형태이다.
  - 객체는 프로퍼티 키를 통해 값을 참조하고, 배열은 인덱스를 통해 값을 참조한다.
- 일반 객체와 배열을 구분하는 가장 명확한 차이는 "값의 순서"와 "length 프로퍼티"이다.
  - 객체는 키-값 쌍 사이에 순서가 없기 때문에 값의 순서에 의미가 없다.
  - 객체는 키-값 쌍의 개수를 자동으로 추적하지 않는다.


## 27.3 length 프로퍼티와 희소 배열

- length 프로퍼티 값에 임의의 숫자 값을 명시적으로 할당할 수도 있다.

```js
const arr = [1, 2, 3, 4, 5]
arr.length = 3;
console.log(arr) // [1, 2, 3]
```

- 현재 length 프로퍼티 값보다 작은 숫자를 할당했을 경우

```js
const arr = [1];
arr.length = 3;
console.log(arr.length) // 3
console.log(arr) // [1, undefined, undefined]
```

- 현재 length 프로퍼티 값보다 큰 숫자를 할당했을 경우
- 실제로 배열의 길이가 늘어나지 않고, arr[1], arr[2]에는 값이 존재하지 않는다.
- 값 없이 비어 있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않는다.


1.  변수 선언(let a;):
  - 변수를 선언하면 메모리 공간이 확보된다.
  - 변수가 선언만 되고 값이 할당되지 않은 상태에서는 기본적으로 undefined 값이 들어간다.
  - 이 undefined는 명시적으로 undefined 값이 메모리에 저장된 상태이다.
2. 배열의 비어 있는 요소:
  - 배열의 비어 있는 요소는 메모리 공간이 확보되지 않은 상태이다.
  - 배열의 길이가 늘어났을 때, 중간에 값을 할당하지 않으면 해당 인덱스는 비어 있는 요소(empty slot)가 된다.
  - 이 비어 있는 요소는 메모리에 실제로 값이 존재하지 않으며, 자바스크립트에서는 이를 시각적으로 undefined로 표현할 뿐이다. (콘솔에서 출력했을 때 undefined처럼 보이는 것일 뿐이다.)

## 27.4 배열 생성
### 27.4.2 Array 생성자 함수

```js
const arr = new Array(10);
console.log(arr); // [undefined * 10]
console.log(arr.length) // 10
```

- 전달된 인수가 1개이고 숫자인 경우 length 프로퍼티 값이 인수인 배열을 생성한다.

```js
new Array(); // []
```

- 전달된 인수가 없는 경우 빈 배열을 생성한다.

```js
new Array(1, 2, 3) // [1, 2, 3]
new Array({}) // [{}]
```

- 전달된 인수가 2개 이상이거나 숫자가 아닌 경우 인수를 요소로 갖는 배열을 생성한다.

### 27.4.3 Array.of

```js
Array.of(1)
Array.of('string')
```

인수를 요소로 갖는 배열 생성

### 27.4.4 Array.from

```js
Array.from({length: 2, 0: 'a', 1: 'b'}) // ['a', 'b']
Array.from('Hello') // ['H', 'e', 'l', 'l', 'o']
// 두 번째 인수로 전달한 콜백 함수의 반환값으로 구성된 배열을 반환한다.
Array.from({length:3}, (_, i) => i) // [0, 1, 2]
```
- 유사 배열 객체 또는 이터러블 객체를 인수로 전달받아 배열로 변환


## 27.7 배열 요소의 삭제

```js
const arr = [1, 2, 3]
delete arr[1]
console.log(arr) // [1, undefined, 3]
```

- delete는 arr에서 프로퍼티 키가 1인 프로퍼티를 삭제한다.

```js
const arr = [1, 2, 3]
arr.splice(1, 1) // 인덱스 1부터 1개의 요소를 제거
console.log(arr) // 2
```

- 희소 배열을 만들지 않으면서 배열의 특정 요소를 완전히 삭제하기
- [splice](#2788-arrayprototypesplice)

## 27.8 배열 메서드

- 배열에는 원본 배열을 직접 변경하는 메서드와, 원본 배열을 직접 변경하지 않고 새로운 배열을 생성하여 반환하는 메서드가 있다.

### 27.8.3 shift, unshift, pop, push

![alt text](image.png)

push와 unshift는 변경된 length 값을 반환한다.

```js
const arr = [1, 2]
let result = arr.push(3, 4);
console.log(result) // 4
```

### 27.8.8 Array.prototype.splice

원본 배열의 중간에 요소를 추가하거나 중간에 있는 요소를 제거한다.

```js
const arr = [1, 2, 3, 4]
// 원본 배열의 인덱스 1부터 2개의 요소를 제거하고 그 자리에 새로운 요소 20, 30을 삽입한다.
const result = arr.splice(1, 2, 20, 30)
// 제거한 요소
console.log(result) // [2, 3]
console.log(arr) // [1, 20, 30, 4]
```

```js
const arr = [1, 2, 3, 4]
const result = arr.splice(1, 0, 100)
console.log(result) // []
console.log(arr) // [1, 100, 2, 3, 4]
```

```js
const arr = [1, 2, 3, 4]
const result = arr.splice(1, 2)
console.log(result) // [2, 3]
console.log(arr) // [1, 4]
```

```js
const arr = [1, 2, 3, 4]
const result = arr.splice(1, 2, 20)
console.log(result) // [2, 3]
console.log(arr) // [1, 20, 4]
```

### 27.8.12 Array.prototype.fill

인수로 전달받은 값을 배열에 채운다. 원본 배열을 바꾼다.

```js
const arr = [1, 2, 3]
arr.fill(0) // [0, 0, 0] - 처음부터 끝까지
arr.fill(0, 1) // [1, 0, 0] - 값 / 인덱스 1부터 끝까지
arr.fill(0, 1, 2) // [1, 0, 3] - 값 / 인덱스 1부터 2 이전까지
```

## 27.9 배열 고차 함수

- 고차 함수는 함수를 인수로 전달받거나 함수를 반환하는 함수를 말한다. 

### 27.9.1 Array.prototype.sort

배열의 요소를 정렬

```js
const points = [40, 100, 1, 5, 2, 25, 10]
points.sort()
console.log(points) // [1, 10, 100, 2, 25, 40, 5]
```

- sort 메서드는 유니코드 코드 포인트를 기준으로 정렬하기 때문에 위와 같은 결과가 출력된다.

```js
function compare(key) {
  return (a, b) => (a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0))
}
todo.sort(compare('id'))
```

### 27.9.4 Array.prototype.filter

콜백 함수의 반환값이 true인 요소로만 구성된 새로운 배열을 반환한다.

```js
const numbers = [1, 2, 3, 4, 5]
const odds = numbers.filter(item => item % 2)
console.log(odds) // [1, 3, 5]
```

### 27.9.5 Array.prototype.reduce

콜백 함수를 호출하여 하나의 결과값을 만들어 반환한다.

```js
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0)
console.log(sum) // 10
```

- 콜백 함수와 초기값의 2개 인수를 전달받아 결과를 반환한다.
- 콜백 함수: `(accumulator, currentValue, index, array) => accumulator + currentValue`
- 초기값: `0`