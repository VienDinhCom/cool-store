import { produce } from 'immer';
import { BehaviorSubject } from 'rxjs';

type CB<S> = (state: S) => S | void;

export class CoolStore<S> {
  private state: S;
  private initialState: S;
  private state$: BehaviorSubject<S>;

  constructor(initialState: S) {
    const state = <S>produce(initialState, () => initialState);

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

  set(recipe: S | CB<S>) {
    if (typeof recipe === 'function') {
      this.state = <S>produce(this.state, <CB<S>>recipe);
    } else {
      this.state = <S>produce(this.state, () => recipe);
    }

    this.emit();
  }

  get() {
    return this.state;
  }

  getChanges() {
    return this.state$.asObservable();
  }
}
