# CoolStore

CoolStore is a simple and powerful state store built on top of [ImmerJS](https://www.npmjs.com/package/immer) and [RxJS](https://www.npmjs.com/package/rxjs).

## Installation

```
npm install --save rxjs
```

```
npm install --save cool-store
```

## Examples

- [How to use CoolStore with React?](https://github.com/Maxvien/cool-store/tree/master/examples/cool-store-react)
- [How to use CoolStore with Angular?](https://github.com/Maxvien/cool-store/tree/master/examples/cool-store-angular)

## How to use `CoolStore`?

#### 1. Create Store

```
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

```
store.set(state => {
  state.name = 'Vien Dinh';
  state.email = 'vien@test.com';
});
```

#### 3. Get State

```
const state = store.get();
console.log({ user: state });
```

#### 4. Subscribe State with `store.getChanges()` observable.

```
store.getChanges().subscribe(state => {
  console.log({ user: state });
});
```

#### 5. Reset State

```
store.reset();
```

### # Advanced `store.set()` method.

#### # Set Entire State

```
store.set({
  name: 'Vien Dinh',
  email: 'vien@test.com',
});
```

```
store.set(() => ({
  name: 'Vien Dinh',
  email: 'vien@test.com',
}));
```

#### # Set State Properties

```
store.set(state => {
  state.name = 'Vien Dinh';
});
```

## How to use `AsyncCoolStore`?

#### 1. Create Store

```
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

```
function getUser(id: number) {
  store.setLoading();

  fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(res => res.json())
    .then(store.setData)
    .catch(store.setError);
}

getUser(1); // execute the function
```

#### 3. Subscribe State with `store.getChanges()` observable.

```
store.getChanges().subscribe(({ loading, data, error }) => {
  console.log({ loading, data, error });
});
```

You can also use `store.get()`, `store.set()`, `store.reset()` methods with `AsyncCoolStore`.

### # Advanced `store.setData()` method.

#### # Set Entire Data

```
store.setData({
  name: 'Vien Dinh',
  email: 'vien@test.com',
});
```

```
store.setData(() => ({
  name: 'Vien Dinh',
  email: 'vien@test.com',
}));
```

#### # Set Data Properties

```
store.setData(state => {
  state.name = 'Vien Dinh';
});
```
