import { BehaviorSubject } from "rxjs";
import produce, { Draft } from "immer";

export class CoolStore<State> {
  private initialState: State;
  private _state: State;
  private state$: BehaviorSubject<State>;

  constructor(initialState: State) {
    this._state = this.clone(initialState);
    this.initialState = this.clone(initialState);
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }

  private clone(state: State) {
    return <State>produce(state, (state: Draft<State>) => {});
  }

  private emit() {
    this.state$.next(this.state);
  }

  set(callback: (state: Draft<State>) => Draft<State>) {
    this._state = <State>produce(this._state, callback);
    this.emit();
  }

  reset() {
    this._state = this.clone(this.initialState);
    this.emit();
  }

  get state() {
    return this.clone(this._state);
  }

  get stateChanges() {
    return this.state$.asObservable();
  }
}
