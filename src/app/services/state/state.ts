import { BehaviorSubject } from "rxjs";
import { GlobalStateInterface } from "./interfaces";
import { ToolsService } from "../tools/tools";

export class State {
  static state: BehaviorSubject<GlobalStateInterface> = new BehaviorSubject<
    GlobalStateInterface
  >({
    questions: {},
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
    State.state.next(ToolsService.deepMerge(State.state.value, newState));
  }
}
