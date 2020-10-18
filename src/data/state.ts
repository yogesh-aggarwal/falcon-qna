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
          total: 1,
          upVoters: ["qwertyuiopasdfghjl"],
          downVoters: [],
        },
      },
      efgh: {
        title: "Hello World! 2",
        content: "Hey this is my second question",
        votes: {
          total: -1,
          upVoters: [],
          downVoters: ["qwertyuiopasdfghjl"],
        },
      },
      abcd2: {
        title: "Hello World! 1",
        content:
          "Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question ",
        votes: {
          total: 1,
          upVoters: ["qwertyuiopasdfghjl"],
          downVoters: [],
        },
      },
      efgh2: {
        title: "Hello World! 2",
        content: "Hey this is my second question",
        votes: {
          total: -1,
          upVoters: [],
          downVoters: ["qwertyuiopasdfghjl"],
        },
      },
      abcd3: {
        title: "Hello World! 1",
        content:
          "Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question Hey this is my first question ",
        votes: {
          total: 1,
          upVoters: ["qwertyuiopasdfghjl"],
          downVoters: [],
        },
      },
      efgh3: {
        title: "Hello World! 2",
        content: "Hey this is my second question",
        votes: {
          total: -1,
          upVoters: [],
          downVoters: ["qwertyuiopasdfghjl"],
        },
      },
    },
    tags: [
      {
        name: "C++",
        color: "#004482",
      },
      {
        name: "TypeScript",
        color: "blue",
      },
    ],
  });

  static setState(newState: GlobalStateInterface) {
    console.log(State.state.value);
    console.log(newState);
    State.state.next(deepMerge(State.state.value, newState));
  }
}
