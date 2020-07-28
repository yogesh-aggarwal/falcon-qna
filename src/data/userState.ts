import { BehaviorSubject } from "rxjs";
import { UserInterface } from "./interfaces/user";
import { deepMerge } from "../services/tools";

export class UserState {
  static state: BehaviorSubject<UserInterface> = new BehaviorSubject<
    UserInterface
  >({
    id: "qwertyuiopasdfghjl",
    ladoo: 300,
    profileImg: "https://bit.ly/3hGSNB6",
    name: "Akshay Kumar",
    email: "yogeshdevaggarwal@gmail.com",
  });

  static setState(newState: any) {
    UserState.state.next(deepMerge(UserState.state.value, newState));
  }
}
