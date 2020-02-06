import { produce } from 'immer';
import { take } from 'rxjs/operators';
import { CoolStore } from '../src';

describe('CoolStore', () => {
  interface State {
    product: {
      name: string;
    };
  }

  let store: CoolStore<State>;

  it('Create Store', () => {
    const initialState: State = {
      product: {
        name: '',
      },
    };

    store = new CoolStore<State>(initialState);

    // initialState.product.name = 'Joker';

    expect(store.get()).toEqual({
      product: {
        name: '',
      },
    });
  });

  it('Get State', () => {
    const state = store.get();

    expect(state).toEqual({
      product: {
        name: '',
      },
    });
  });

  it('Get State Changes', done => {
    store
      .getChanges()
      .pipe(take(2))
      .subscribe({
        next: state => {
          const cloneState = produce(state, () => state);

          // state.product['name'] = 'Joker';

          expect(cloneState).toEqual(store.get());

          store.set(state => {
            state.product.name = 'iPhone';
          });

          expect(cloneState).toEqual(store.get());
        },
        complete: () => done(),
      });
  });

  it('Set Entire State 1', () => {
    store.set({
      product: {
        name: 'Nokia',
      },
    });

    expect(store.get()).toEqual({
      product: {
        name: 'Nokia',
      },
    });
  });

  it('Set Entire State 2', () => {
    const product = {
      name: 'Galaxy',
    };

    store.set(() => ({ product }));

    // product.name = 'Joker';

    expect(store.get()).toEqual({
      product: {
        name: 'Galaxy',
      },
    });
  });

  it('Set Chilren State', () => {
    const product = {
      name: 'iPhone',
    };

    store.set(state => {
      state.product = product;
    });

    // product.name = 'Joker';

    expect(store.get()).toEqual({
      product: {
        name: 'iPhone',
      },
    });
  });

  it('Reset State', () => {
    store.reset();

    expect(store.get()).toEqual({
      product: {
        name: '',
      },
    });
  });
});
