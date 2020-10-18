import { firestore } from "../firebase/firebase";
import { QuestionInterface } from "../state/interfaces";
import { State } from "../state/state";

export class Data {
  static async prepareData() {
    let questions: { [key: string]: QuestionInterface } = {};

    (await firestore.collection("questions").get()).docs.forEach((doc) => {
      let question = doc.data() as QuestionInterface;
      questions[doc.id] = question;
    });

    State.setState({ questions: questions });
    console.log(State.state.value);
  }
}
