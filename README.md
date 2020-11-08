# CoolStore

CoolStore is a simple and powerful state store built on top of [ImmerJS](https://www.npmjs.com/package/immer) and [RxJS](https://www.npmjs.com/package/rxjs).

Hit the **Star** button if you love this project ⭐️

## Installation

```
npm install --save cool-store rxjs
```

## Usage

- [CoolStore](https://github.com/Maxvien/cool-store#how-to-use-coolstore)
- [AsyncCoolStore](https://github.com/Maxvien/cool-store#how-to-use-asynccoolstore)

## Examples

- [How to use CoolStore with React?](https://github.com/Maxvien/cool-store/tree/master/examples/cool-store-react)
- [How to use CoolStore with Angular?](https://github.com/Maxvien/cool-store/tree/master/examples/cool-store-angular)

## How to use `CoolStore`?

#### 1. Create Store

```ts
import { CoolStore } from 'cool-store';

interface User {
  name: string;
  email: string;
}

const initialState: User = {
  name: null,
  email: null,
};

const store = new CoolStore(initialState);
```

#### 2. Set State

```ts
store.set(state => {
  state.name = 'Vien Dinh';
  state.email = 'vien@test.com';
});
```

#### 3. Get State

```ts
const state = store.get();
console.log({ user: state });
```

#### 4. Subscribe State with `store.getChanges()` observable.

```ts
store.getChanges().subscribe(state => {
  console.log({ user: state });
});
```

#### 5. Reset State

```ts
store.reset();
```

### # Advanced `store.set()` method.

#### # Set Entire State

```ts
store.set({
  name: 'Vien Dinh',
  email: 'vien@test.com',
});
```

```ts
store.set(() => ({
  name: 'Vien Dinh',
  email: 'vien@test.com',
}));
```

#### # Set State Properties

```ts
store.set(state => {
  state.name = 'Vien Dinh';
});
```

## How to use `AsyncCoolStore`?

#### 1. Create Store

```ts
import { AsyncCoolStore, AsyncCoolState } from 'cool-store';

interface User {
  name: string;
  email: string;
}

const initialState: AsyncCoolState<User, Error> = {
  loading: false,
  data: null,
  error: null,
};

const store = new AsyncCoolStore(initialState);
```

#### 2. Set State

```ts
function getUser(id: number) {
  store.setLoading();

  fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(res => res.json())
    .then(data => store.setData(data))
    .catch(error => store.setError(error));
}

getUser(1); // execute the function
```

#### 3. Subscribe State with `store.getChanges()` observable.

```ts
store.getChanges().subscribe(({ loading, data, error }) => {
  console.log({ loading, data, error });
});
```

You can also use `store.get()`, `store.set()`, `store.reset()` methods with `AsyncCoolStore`.

### # Advanced `store.setData()` method.

#### # Set Entire Data

```ts
store.setData({
  name: 'Vien Dinh',
  email: 'vien@test.com',
});
```

```ts
store.setData(() => ({
  name: 'Vien Dinh',
  email: 'vien@test.com',
}));
```

#### # Set Data Properties

```ts
store.setData(state => {
  state.name = 'Vien Dinh';
});
```
