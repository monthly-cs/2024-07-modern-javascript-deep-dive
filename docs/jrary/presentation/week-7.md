# 6주차 발표 자료

# 35장 스프레드 문법

**`...`**
- 하나로 뭉쳐 있는 여러 값들의 집합을 펼쳐서 개별적인 값들의 목록으로 만든다
- Array, String, Map, Set, DOM 컬렉션, arguments에 사용할 수 있다.

```js
console.log(...[1, 2, 3]) // 1 2 3
console.log(...'Hello') //  H e l l o
console.log(...new Map([['a', '1'], ['b', '2']])) // ['a', '1'] ['b', '2']
console.log(...new Set([1, 2, 3])) // 1 2 3
```

```js
const list = ...[1, 2, 3]
// SyntaxError: Unexpected token ...
```

- 스프레드 문법의 결과는 값이 아니다.

## 35.1 함수 호출문의 인수 목록에서 사용하는 경우

```js
var arr = [1, 2, 3]
// Math.max 메서드는 숫자가 아닌 배열을 인수로 전달하면 최대값을 구할 수 없다.
Math.max(arr); // NaN
Math.max(1, 2, 3) // 3
// 스프레드 문법 사용
Math.max(...arr) // 3
```

## 35.2 배열 리터럴 내부에서 사용하는 경우
## 35.2.3 배열 복사

```js
const origin = [1, 2]
const copy = [...origin]
console.log(copy === origin) // false
```

# 36장 디스트럭처링 할당

디스트럭처링 할당 : 이터러블 or 객체를 디스트럭처링하여 1개 이상의 변수에 개별적으로 할당하는 것

## 36.1 배열 디스트럭처링 할당

- 배열의 각 요소를 배열로부터 추출하여 1개 이상의 변수에 할당

- 배열 디스트럭처링 할당의 대상(우변) → 이터러블
- 할당 기준은 배열의 인덱스 (순서대로 할당)

  ```jsx
  // 배열(= 이터러블)
  const arr = [1, 2, 3];

  // 배열 디스트럭처링
  const [one, two, three] = arr;

  console.log(one, two, three); // 1 2 3
  ```

- 배열 디스트럭처링 할당의 변수의 개수와 이터러블의 요소 개수가 반드시 일치하지 않아도 된다.

  ```jsx
  const arr = [1, 2, , 3];

  // 선언한 디스트럭처링 할당 변수보다 배열의 요소 개수가 더 많음 ( 상관없음 )
  const [one, two, three] = arr;

  console.log(one, two, three); // 1 2 undefined
  ```

- 배열 디스트럭처링 할당을 위해 변수에 기본값을 설정할 수 있다.

  ```jsx
  const arr = [1, 2, 4];

  // 디스트럭처링 할당 변수에 기본값 설정
  // 우선 순위 = 기본값 설정 < 디스트럭처링 할당
  const [one, two, three = 3] = arr;

  console.log(one, two, three); // 1 2 4
  ```

- 이터러블에서 필요한 요소만 추출하여 변수에 할당하고 싶을 때 유용하게 사용

  ```jsx
  // URL 파싱 -> { protocol, host, path } 프로퍼티를 갖는 객체 생성 후 반환

  function parseURL(url = "") {
    const parsedURL = url.match(/^(\w+):\/\/([^/]+)\/(.*)$/);
    console.log(parsedURL);
    // [
    //   'https://google.com/ko/javascript',
    //   'https',
    //   'google.com',
    //   'ko/javascript',
    //   index: 0,
    //   input: 'https://google.com/ko/javascript',
    //   groups: undefined
    // ]

    if (!parseURL) return {};

    const [, protocol, host, path] = parsedURL;
    return { protocol, host, path };
  }

  const parsedURL = parseURL("https://google.com/ko/javascript");
  console.log(parsedURL); // { protocol: 'https', host: 'google.com', path: 'ko/javascript' }
  ```

- 디스트럭처링 할당을 받을 변수에 Rest element를 사용 가능
  ```jsx
  const [x, ...y] = [1, 2, 3];
  console.log(x, y); // 1 [ 2, 3 ]
  ```

## 36.2 객체 디스트럭처링 할당

- 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당

- 객체 디스트럭처링 할당의 대상(우변) → 객체
- 할당 기준은 프로퍼티 키 ( 순서는 의미가 없으며, 선언된 변수 이름과 프로퍼티 키가 일치하면 할당)

  ```jsx
  const user = {
    firstName: "Shine",
    lastName: "Lee",
  };

  // 객체 디스트럭처링 할당 ( 순서 상관 X, 단지 변수 이름 === 객체 프로퍼티 키 이름 )
  const { lastName, firstName } = user;
  console.log(lastName, firstName); 
  ```

- 할당받을 변수이름을 디스트럭처링 대상 객체의 프로퍼티 이름과 다르게 하려면 다음과 같이 변수를 선언

  ```jsx
  const user = {
    firstName: "Shine",
    lastName: "Lee",
  };

  // 객체 디스트럭처링 할당 변수의 이름과 객체 프로퍼티 키 이름을 다르게 할당받고 싶을 경우
  const { lastName: ln, firstName: fn } = user;
  console.log(ln, fn); 
  console.log(lastName, firstName); // ReferenceError: lastName is not defined
  ```

- 객체 디스트럭처링 할당을 위해 변수에 기본값을 설정할 수 있다.

  ```jsx
  // 객체 디스트럭처링 할당 기본값 설정
  const { firstName = "Shine", lastName } = { lastName: "Lee" };

  console.log(lastName, firstName); 
  ```

- 객체의 프로퍼티 키로 필요한 프로퍼티 값만 추출하여 변수에 할당하고 싶을 때 유용하게 사용 가능

  - 객체를 인수로 전달받는 함수의 매개변수에도 사용할 수 있다.
  - 좀 더 간단하고 가독성 좋게 표현 가능

  ```jsx
  function printFruit({ id, name }) {
    console.log(`상품코드 : ${id}, 상품명 : ${name}`);
  }

  printFruit({ id: 1, name: "사과" }); // 상품코드 : 1, 상품명 : 사과
  ```

- 객체 디스트럭처링 할당을 위한 변수에 Rest 요소를 사용 가능

  ```jsx
  // 객체 디스트럭처링 Rest 요소 적용
  const { x, ...rest } = { x: 1, y: 2, z: 3 };

  console.log(x, rest); // 1 { y: 2, z: 3 }
  ```

# 37장 Set과 Map
## 37.1 Set
### 37.1.1 Set 객체의 생성

-  Set 객체는 Set 생성자 함수로 생성한다.

- Set 생성자 함수는 이터러블을 인수로 전달 받아 Set 객체를 생성

  - 중복된 값은 Set 객체에 요소로 저장되지 않는다.
  - 중복을 허용하지 않는 Set 객체의 특정을 활용하여 배열에서 중복된 요소를 제거 가능

  ```jsx
  // Set 기본
  const set1 = new Set([1, 2, 2, 3]);
  console.log(set1); // Set(3) { 1, 2, 3 }

  const set2 = new Set("Hello");
  console.log(set2); // Set(4) { 'H', 'e', 'l', 'o' }

  // 중복된 요소 제거
  const uniq = (arr) => [...new Set(arr)];
  console.log(uniq([2, 1, 2, 3, 4, 3, 4])); // [ 2, 1, 3, 4 ]
  ```

### 37.1.3 요소 추가

- 메서드 실행 결과는 새로운 요소가 추가된 Set 객체를 반환한다. 이를 이용해 add 메서드 체이닝 가능
- 중복되 요소의 추가는 허용되지 않고, 이때 에러는 발생하지 않고 무시

```jsx
const set1 = new Set([1, 2, 2, 3]);
console.log(set1); // Set(3) { 1, 2, 3 }

set1.add(4);
console.log(set1); // Set(4) { 1, 2, 3, 4 }
```

```jsx
const set = new Set();

// add 메서드 체이닝
set
  .add(1)
  .add("a")
  .add(true)
  .add(undefined)
  .add(null)
  .add({})
  .add([])
  .add(() => {});
```

### 37.1.7 요소 순회

- 첫 번째 인수 → 현재 순회 중인 요소값
- 두 번째 인수 → 현재 순회 중인 요소값
- 세 번쨰 인수 → 현재 순회 중인 Set 객체 자신
- 첫 번째, 두 번째 인수가 같은 것은 단순히 Array.prototoype.forEach 메서드와 인터페이스를 통일하기 위함

  ```jsx
  const set = new Set([1, 2, 3]);

  set.forEach((v1, v2, self) => console.log(v1, v2, self));
  // 1 1 Set(3) { 1, 2, 3 }
  // 2 2 Set(3) { 1, 2, 3 }
  // 3 3 Set(3) { 1, 2, 3 }
  ```

- `Set 객체는 이터러블이므로, for - of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상이 된다.

  ```jsx
  const set = new Set([1, 2, 3]);

  // Set 객체가 이터러블 -> Symbol.iterator 프로퍼티가 존재하는지 확인
  console.log(Symbol.iterator in set); // true

  // Set 객체가 이터러블 -> for - of문 가능
  for (const value of set) {
    console.log(value); // 1 2 3
  }

  // Set 객체가 이터러블 -> 스프레드 문법 가능
  console.log([...set]); // [ 1, 2, 3 ]

  // Set 객체가 이터러블 -> 배열 디스트럭처링 가능
  const [a, ...rest] = set;
  console.log(a, rest); // 1 [ 2, 3 ]
  ```

- Set 객체는 요소의 순서가 무의미하지만, Set 객체를 순회하는 순서는 요소가 추가된 순서를 따른다.
  - ECMAScript 표준 사양에 규정되어 있지는 않지만, 다른 이터러블의 순회와 호환성을 유지하기 위함

## 37.2 Map
### 37.2.1 Map 객체의 생성

- Map 객체는 Map 생성자 함수로 생성

- Map 생성자 함수는 인수로 이터러블을 전달받아 Map 객체를 생성한다. 이 때 전달되는 이터러블은 키와 값의 쌍으로 이루어진 요소로 구성되어야 한다.

  ```jsx
  const map1 = new Map([
    ["key1", "value1"],
    ["key2", "value2"],
  ]);
  console.log(map1); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }

  const map2 = new Map([1, 2]); // TypeError: Iterator value 1 is not an entry object
  ```

  - 인수로 전달한 이터러블의 중복된 키를 갖는 요소가 존재하면 값이 덮어써진다.

  ```jsx
  const map1 = new Map([
    ["key1", "기존 값"],
    ["key1", "덮어쓰인 값"],
  ]);
  console.log(map1); // Map(1) { 'key1' => '덮어쓰인 값' }
  ```

### 37.2.3 요소 추가

- 요소가 추가된 새로운 Map 객체를 반환

  ```jsx
  const map = new Map();
  console.log(map); // Map(0) {}

  map.set("key1", "value1");
  console.log(map); // Map(1) { 'key1' => 'value1' }
  ```

  - set 메서드는 map 객체를 반환하므로, set을 호출한 후에 set 메서드를 다시 연속적으로 호출 가능.

  ```jsx
  const map = new Map();
  console.log(map); // Map(0) {}

  map.set("key1", "value1").set("key2", "value2");
  console.log(map); // Map(2) { 'key1' => 'value1', 'key2' => 'value2' }
  ```

- 중복된 키를 갖는 요소가 존재할 수 없기 때문에 중복된 키를 갖는 요소를 추가하면 갚이 덮어쓰여진다. ( 에러 발생 X )
- 객체는 문자열과 심벌 값만 키로 허용하지만, Map 객체는 자바스크립트의 모든 값을 키로 허용

  ```jsx
  const map = new Map();

  const lee = { name: "Lee" };
  const kim = { name: "Kim" };

  // 객체를 Map 객체의 키로 사용 가능
  map.set(lee, "developer");
  map.set(kim, "designer");

  console.log(map);
  // Map(2) {
  //   { name: 'Lee' } => 'developer',
  //   { name: 'kim' } => 'designer'
  // }
  ```

### 37.2.8 요소 순회

- 첫 번째 인수 → 현재 순회 중인 요소 값
- 두 번째 인수 → 현재 순회 중인 요소 키
- 세 번쨰 인수 → 현재 순회 중인 Map객체 자신
- 첫 번째, 두 번째 인수가 같은 것은 단순히 Array.prototoype.forEach 메서드와 인터페이스를 통일하기 위함

  ```jsx
  const lee = { name: "Lee" };
  const kim = { name: "Kim" };

    const map = new Map([
    [obj1, "developer"],
    [obj2, "designer"],
    ]);

  map.forEach((v, k, self) => console.log(v, k, self));
  // developer { name: 'Lee' } Map(2) { { name: 'Lee' } => 'developer', { name: 'Kim' } => 'designer' }
  // designer { name: 'Kim' } Map(2) { { name: 'Lee' } => 'developer', { name: 'Kim' } => 'designer' }
  ```

- Map 객체는 이터러블이므로, for - of문, 스프레드 문법, 배열 디스트럭처링 할당의 대상이 된다.

  - `이터레이터인 객체를 반환하는 메서드이기도 하다.`
    | Map 메서드 | 설명 |
    | ----- | ----- |
    | Map.prototype.keys | Map 객체에서 요소키를 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
    | Map.prototype.values | Map 객체에서 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
    | Map.prototype.entries | Map 객체에서 요소키와 요소값을 값으로 갖는 이터러블이면서 동시에 이터레이터인 객체를 반환 |
