import produce, { Draft } from "immer";
import { CoolStore } from "./cool-store";

interface AsyncCoolState<Data, Error> {
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

  setData(recipe: (data: Draft<Data>) => void) {
    this.set(state => {
      state.loading = false;
      state.error = null;
      state.data = produce(state.data, recipe);
    });
  }

  setError(error: Draft<Error>) {
    this.set(state => {
      state.loading = false;
      state.error = error;
    });
  }
}
