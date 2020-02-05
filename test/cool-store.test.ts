import { CoolStore } from '../src';
import { take } from 'rxjs/operators';
import clone from 'lodash.clonedeep';

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

    // Joker
    initialState.product.name = 'iPhone';

    expect(store.get()).toEqual({
      product: {
        name: '',
      },
    });
  });

  it('Get State', () => {
    const state = store.get();

    // Joker
    state.product['name'] = 'Galaxy';

    expect(store.get()).toEqual({
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
          const cloneState = clone(state);

          // Joker
          state.product['name'] = 'Galaxy';

          expect(cloneState).toEqual(store.get());

          // Set State
          store.set(state => {
            state.product.name = 'iPhone';
          });

          expect(cloneState).toEqual(store.get());
        },
        complete: () => done(),
      });
  });

  it('Set Entire State', () => {
    const product = {
      name: 'Galaxy',
    };

    store.set(() => ({ product }));

    // Joker
    product.name = 'iPhone';

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

    // Joker
    product.name = 'Galaxy';

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
