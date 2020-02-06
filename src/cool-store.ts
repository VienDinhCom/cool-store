import { produce } from 'immer';
import { BehaviorSubject } from 'rxjs';

export class CoolStore<State> {
  private state: State;
  private initialState: State;
  private state$: BehaviorSubject<State>;

  constructor(initialState: State) {
    const state = <State>produce(initialState, () => initialState);

    this.state = state;
    this.initialState = state;
    this.state$ = new BehaviorSubject(state);
  }

  private emit() {
    this.state$.next(this.state);
  }

  reset() {
    this.state = this.initialState;
    this.emit();
  }

  set(recipe: (state: State) => State | void) {
    this.state = <State>produce(this.state, recipe);
    this.emit();
  }

  get() {
    return this.state;
  }

  getChanges() {
    return this.state$.asObservable();
  }
}
