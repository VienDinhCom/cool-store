import { CoolStore } from './cool-store';

export interface AsyncCoolState<Data, Error> {
  loading: boolean;
  data: Data | null;
  error: Error | null;
}

type CB<Data> = (data: Data | null) => Data | null | void;

export class AsyncCoolStore<Data, Error> extends CoolStore<
  AsyncCoolState<Data, Error>
> {
  setLoading() {
    this.set(state => {
      state.loading = true;
      state.error = null;
    });
  }

  setData(recipe: Data | CB<Data>) {
    this.set(state => {
      state.loading = false;
      state.error = null;

      function callFn(cb: CB<Data>) {
        return cb(state.data);
      }

      if (typeof recipe === 'function') {
        const data = callFn(<CB<Data>>recipe);
        if (data) state.data = data;
      } else {
        state.data = <Data>recipe;
      }
    });
  }

  setError(error: Error) {
    this.set(state => {
      state.loading = false;
      state.error = error;
    });
  }
}
