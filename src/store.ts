import { BehaviorSubject } from 'rxjs';

export class Store<State> {
  private state: State | null = null;
  private state$ = new BehaviorSubject<State | null>(this.state);

  constructor(state: State) {
    if (state !== undefined) {
      this.state = state;
      this.state$.next({ ...this.state });
    }
  }

  public getState() {
    return this.state;
  }

  public getObservable() {
    return this.state$.asObservable();
  }

  public emit(state: State) {
    this.state = state;
    this.state$.next({ ...this.state });
  }
}
