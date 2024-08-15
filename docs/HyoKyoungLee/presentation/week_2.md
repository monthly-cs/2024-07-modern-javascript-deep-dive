# 2주차 발표 자료

## 자바스크립트 스코프 퀴즈

- 자바스크립트 scope 에 대하 정확한 이해를 하고 있는가 점검하기 위한 퀴즈

### 1번 문제

```js
var name = "global";

function fn() {
  console.log(this.name);
}

class Outer {
  name = "object property";
  inner() {
    var name = "inner of local";
    console.log(this.name);
    fn();
  }
}

new Outer().inner();
```

<details><summary>정답</summary>
- this는 객체 메소드로서 호출될 때는 해당 객체가 되고, 함수로서 직접 호출될 때는 전역 객체를 가리킨다.

```
object property
global
```

</details>

### 2번 문제

```js
var name = "global";

class Outer {
  name = "object property";
  inner() {
    var name = "inner of local";
    console.log(this.name); // ?
    function fn() {
      console.log(this.name); // ?
    }
    fn();
  }
}

new Outer().inner();
```

<details><summary>정답</summary>
- ECMAScript 5부터 엄격 모드('use strict')가 적용된 환경에서는 함수 내부에서 this가 정의되지 않으면 undefined가 된다. 따라서 fn 함수 내부에서 this는 undefined가 되고, undefined.name에 접근하려고 시도하기 때문에 TypeError가 발생한다.

```
object property
Uncaught TypeError: Cannot read property 'name' of undefined
    at fn (<anonymous>:9:24)
    at Outer.inner (<anonymous>:11:5)
    at <anonymous>:15:13
```

</details>

### 3번 문제

```js
var name = "global";

function Outer() {
  var name = "object property";
  function inner() {
    var name = "inner of local";
    console.log(this.name);
    function fn() {
      console.log(this.name);
    }
    fn();
  }
  inner();
}

Outer();
```

<details><summary>정답</summary>
- fn과 inner 가 모두 함수로서 호출되었기 때문에 this 는 전역 객체를 가르킨다.

```
global
global
```

</details>

### 4번 문제

```js
var name = "global";

function Outer() {
  var name = "object property";
  var inner = () => {
    var name = "inner of local";
    console.log(this.name);
    function fn() {
      console.log(this.name);
    }
    fn();
  };
  inner();
}

Outer();
```

<details><summary>정답</summary>
- 화살표함수도 this 는 전역객체를 가리킨다.

```
global
global
```

</details>

### 5번 문제

```js
var name = "global";

function Outer() {
  this.name = "object property";
  this.inner = () => {
    var name = "inner of local";
    console.log(this.name);
    function fn() {
      console.log(this.name);
    }
    fn();
  };
}
var o = new Outer();
var fn2 = o.inner;
fn2();
```

<details><summary>정답</summary>
- 화살표 함수의 this는 함수 호출 시점이 아닌 함수가 생성되는 시점의 객체를 가리킨다.

```
object property
global
```

</details>
