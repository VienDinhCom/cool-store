import { CoolStore } from './cool-store';

export interface AsyncCoolState<Data, Error> {
  loading: boolean;
  data: Data | null;
  error: Error | null;
}

export class AsyncCoolStore<Data, Error> extends CoolStore<
  AsyncCoolState<Data, Error>
> {
  setLoading() {
    this.set(state => {
      state.loading = true;
      state.error = null;
    });
  }

  setData(callback: (data: Data | null) => Data | null | void) {
    this.set(state => {
      const data = callback(state.data);

      state.loading = false;
      state.error = null;

      if (data) state.data = data;
    });
  }

  setError(error: Error) {
    this.set(state => {
      state.loading = false;
      state.error = error;
    });
  }
}
