import { BehaviorSubject } from "rxjs";
import { GlobalStateInterface } from "./interfaces/data";
import { deepMerge } from "../services/tools";

export class State {
  static state: BehaviorSubject<GlobalStateInterface> = new BehaviorSubject<
    GlobalStateInterface
  >({
    questions: {
      abcd: {
        title: "Hello World! 1",
        content:
          "Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question ",
        votes: {
          total: 200,
          upVoters: ["qwertyuiopasdfghjl"],
          downVoters: [],
        },
      },
      efgh: {
        title: "Hello World! 2",
        content: "Hey this is my second question",
        votes: {
          total: 200,
          upVoters: [],
          downVoters: ["qwertyuiopasdfghjl"],
        },
      },
    },
  });

  static setState(newState: GlobalStateInterface) {
    console.log(State.state.value);
    console.log(newState);
    State.state.next(deepMerge(State.state.value, newState));
  }
}
