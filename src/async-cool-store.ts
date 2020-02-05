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
      const returnData = <Data | null>callback(state.data);

      if (returnData) state.data = returnData;

      state.loading = false;
      state.error = null;
    });
  }

  setError(error: Error) {
    this.set(state => {
      state.loading = false;
      state.error = error;
    });
  }
}
