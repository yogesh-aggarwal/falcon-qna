import { BehaviorSubject } from "rxjs";
import { StateInterface } from "./interfaces";

export class State {
  static state: BehaviorSubject<StateInterface>;

  static setState(newState: any) {
    State.state.next({ ...State.state.value, ...newState });
  }
}
