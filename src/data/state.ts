import { BehaviorSubject } from "rxjs";
import { StateInterface } from "./interfaces/data";
import { deepMerge } from "../services/tools";

export class State {
  static state: BehaviorSubject<StateInterface> = new BehaviorSubject<
    StateInterface
  >({
    questions: {
      abcd: { title: "Hello World! 1" },
      efgh: { title: "Hello World! 2" },
    },
  });

  static setState(newState: StateInterface) {
    console.log(State.state.value);
    console.log(newState);
    State.state.next(deepMerge(State.state.value, newState));
  }
}
