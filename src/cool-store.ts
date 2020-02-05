import clone from 'lodash.clonedeep';
import { BehaviorSubject } from 'rxjs';

export class CoolStore<State> {
  private initialState: State;
  private state: State;
  private state$: BehaviorSubject<State>;

  constructor(initialState: State) {
    this.state = clone(initialState);
    this.initialState = clone(initialState);
    this.state$ = new BehaviorSubject(clone(initialState));
  }

  private emit() {
    this.state$.next(clone(this.state));
  }

  reset() {
    this.state = clone(this.initialState);
    this.emit();
  }

  set(callback: (state: State) => State | void) {
    const inputState = clone(this.state);
    const returnState = <State>callback(inputState);

    this.state = returnState ? clone(returnState) : clone(inputState);

    this.emit();
  }

  get() {
    return clone(this.state);
  }

  getChanges() {
    return this.state$.asObservable();
  }
}
