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

  private _state = new BehaviorSubject<AsyncState<Data>>(this.state);

  constructor(state?: AsyncState<Data>) {
    if (state !== undefined) {
      this.state = state;
      this._state.next({ ...this.state });
    }
  }

  public getData() {
    return this.state.data;
  }

  public getState() {
    return this.state;
  }

  public getObservable() {
    return this._state.asObservable();
  }

  public emitRequest(data?: Data | null) {
    this.state.error = null;
    this.state.loading = true;

    if (data !== undefined) {
      this.state.data = data;
    }

    this._state.next({ ...this.state });
  }

  public emitSuccess(data: Data) {
    this.state.loading = false;
    this.state.data = data;

    this._state.next({ ...this.state });
  }

  public emitFailure(error: Error) {
    this.state.loading = false;
    this.state.error = error;

    this._state.next({ ...this.state });
  }
}
