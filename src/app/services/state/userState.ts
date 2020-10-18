import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interfaces";
import { ToolsService } from "../tools/tools";

export class UserState {
  static state: BehaviorSubject<UserInterface> = new BehaviorSubject<
    UserInterface
  >({
    id: "qwertyuiopasdfghjl",
    ladoo: 300,
    profileImg: "https://bit.ly/3hGSNB6",
    name: "Akshay Kumar",
    email: "yogeshdevaggarwal@gmail.com",
    isSuspended: false,
  });

  static setState(newState: any) {
    UserState.state.next(
      ToolsService.deepMerge(UserState.state.value, newState)
    );
  }
}
