import { BehaviorSubject } from 'rxjs';

export interface AsyncState<Data> {
  loading: boolean;
  data: Data | null;
  error: Error | null;
}

export class AsyncStore<Data> {
  private state: AsyncState<Data> = {
    loading: false,
    data: null,
    error: null,
  };

  private state$ = new BehaviorSubject<AsyncState<Data>>(this.state);

  constructor(state?: AsyncState<Data>) {
    if (state !== undefined) {
      this.state = state;
      this.state$.next({ ...this.state });
    }
  }

  public getData() {
    return this.state.data;
  }

  public getState() {
    return this.state;
  }

  public getObservable() {
    return this.state$.asObservable();
  }

  public emitRequest(data?: Data | null) {
    if (data === undefined) {
      this.state = { ...this.state, loading: true, error: null };
    } else {
      this.state = { ...this.state, loading: true, data: data, error: null };
    }

    this.state$.next({ ...this.state });
  }

  public emitSuccess(data: Data) {
    this.state = { ...this.state, loading: false, data: data, error: null };

    this.state$.next({ ...this.state });
  }

  public emitFailure(error: Error) {
    this.state = { ...this.state, loading: false, error: error };

    this.state$.next({ ...this.state });
  }
}
