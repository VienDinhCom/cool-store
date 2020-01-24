import { BehaviorSubject } from 'rxjs';

export class Store<State> {
  private state: State | null = null;
  private _state = new BehaviorSubject<State | null>(this.state);

  constructor(state: State) {
    if (state !== undefined) {
      this.state = state;
      this._state.next({ ...this.state });
    }
  }

  public getState() {
    return this.state;
  }

  public getObservable() {
    return this._state.asObservable();
  }

  public emit(state: State) {
    this.state = state;
    this._state.next({ ...this.state });
  }
}
