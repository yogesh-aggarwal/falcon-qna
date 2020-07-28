import { BehaviorSubject } from "rxjs";
import { StateInterface } from "./interfaces/data";
import { deepMerge } from "../services/tools";

export class State {
  static state: BehaviorSubject<StateInterface> = new BehaviorSubject<
    StateInterface
  >({
    questions: {
      abcd: {
        title: "Hello World! 1",
        content:
          "Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question ",
        votes: {
          total: 200,
        },
      },
      efgh: {
        title: "Hello World! 2",
        content: "Hey this is my second question",
        votes: {
          total: 200,
        },
      },
    },
  });

  static setState(newState: StateInterface) {
    console.log(State.state.value);
    console.log(newState);
    State.state.next(deepMerge(State.state.value, newState));
  }
}
