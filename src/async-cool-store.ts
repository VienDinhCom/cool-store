import { CoolStore } from './cool-store';

export interface AsyncCoolState<D, E = Error> {
  loading: boolean;
  data: D | null;
  error: E | null;
}

type CB<D> = (data: D | null) => D | null | void;

export class AsyncCoolStore<S extends AsyncCoolState<any>> extends CoolStore<
  S
> {
  setLoading() {
    this.set(state => {
      state.loading = true;
      state.error = null;
    });
  }

  setData(recipe: S['data'] | CB<S['data']>) {
    this.set(state => {
      state.loading = false;
      state.error = null;

      function callFn(cb: CB<S['data']>) {
        return cb(state.data);
      }

      if (typeof recipe === 'function') {
        const data = callFn(<CB<S['data']>>recipe);
        if (data !== undefined) state.data = data;
      } else {
        state.data = <S['data']>recipe;
      }
    });
  }

  setError(error: S['error']) {
    this.set(state => {
      state.loading = false;
      state.error = error;
    });
  }
}
