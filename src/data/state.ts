import { BehaviorSubject } from "rxjs";
import { StateInterface } from "./interfaces";

export class State {
  static state: BehaviorSubject<StateInterface> = new BehaviorSubject<
    StateInterface
  >({ name: "j" });

  static setState(newState: any) {
    State.state.next({ ...State.state.value, ...newState });
  }
}
