import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interfaces";
import { ToolsService } from "../tools/tools";

export class UserState {
  static state: BehaviorSubject<UserInterface> = new BehaviorSubject({});

  static setState(user: UserInterface) {
    UserState.state.next(ToolsService.deepMerge(UserState.state.value, user));
  }
}
