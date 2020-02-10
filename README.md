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

## Usage

### How to use `CoolStore`?

```
import { CoolStore } from 'cool-store';

interface User {
  name: string;
  email: string;
}

const initialUser: User = {
  name: null,
  email: null,
};

// Create Store
const store = new CoolStore(initialUser);

// Set State
store.set(user => {
  user.name = 'Vien Dinh';
  user.email = 'vien@test.com';
});

// Get State
const user = store.get();
console.log({ user });

// Subscribe State
store.getChanges().subscribe(user => {
  console.log({ user });
});

// Reset State
store.reset();
```

### How to use `AsyncCoolStore`?

```
import { AsyncCoolStore, AsyncCoolState } from 'cool-store';

interface User {
  name: string;
  email: string;
}

const initialUser: AsyncCoolState<User, Error> = {
  loading: false,
  data: null,
  error: null,
};

// Create Store
const store = new AsyncCoolStore(initialUser);

// Set State
function getUser(id: number) {
  store.setLoading();

  fetch('https://jsonplaceholder.typicode.com/users/' + id)
    .then(res => res.json())
    .then(store.setData)
    .catch(store.setError);
}

// Execute Function
getUser(1);

// Subscribe State
store.getChanges().subscribe(({ loading, data, error }) => {
  console.log({ loading, data, error });
});
```

You can also use `store.get()`, `store.set()`, `store.reset()` methods with `AsyncCoolStore`.
