import { AsyncCoolStore, AsyncCoolState } from '../src';

describe('AsyncCoolStore', () => {
  interface Product {
    name: string;
  }

  let store: AsyncCoolStore<Product, Error>;

  it('Create Store', () => {
    const initialState: AsyncCoolState<Product, Error> = {
      loading: false,
      data: null,
      error: null,
    };

    store = new AsyncCoolStore(initialState);

    expect(store.get()).toEqual(initialState);
  });

  it('Set Loading', () => {
    store.setLoading();

    expect(store.get()).toEqual({
      loading: true,
      data: null,
      error: null,
    });
  });

  it('Set Entire Data', () => {
    store.setData(() => ({ name: 'iPhone' }));

    expect(store.get()).toEqual({
      loading: false,
      data: {
        name: 'iPhone',
      },
      error: null,
    });
  });

  it('Set Chilren Data', () => {
    store.setData(data => {
      if (data) data.name = 'Galaxy';
    });

    expect(store.get()).toEqual({
      loading: false,
      data: {
        name: 'Galaxy',
      },
      error: null,
    });
  });

  it('Set Error', () => {
    const error = new Error();

    store.setError(error);

    expect(store.get()).toEqual({
      loading: false,
      data: {
        name: 'Galaxy',
      },
      error,
    });
  });
});
