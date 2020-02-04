import { BehaviorSubject } from "rxjs";
import produce, { Draft } from "immer";

export class CoolStore<State> {
  private initialState: State;
  private state: State;
  private state$: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.state = this.clone(initialState);
    this.initialState = this.clone(initialState);
    this.state$ = new BehaviorSubject(this.clone(initialState));
  }

  private clone(state: State) {
    return <State>produce(state, (state: Draft<State>) => state);
  }

  private emit() {
    this.state$.next(this.clone(this.state));
  }

  set(callback: (state: Draft<State>) => Draft<State>) {
    this.state = <State>produce(this.state, callback);
    this.emit();
  }

  reset() {
    this.state = this.clone(this.initialState);
    this.emit();
  }

  get() {
    return this.clone(this.state);
  }

  getChanges() {
    return this.state$.asObservable();
  }
}
