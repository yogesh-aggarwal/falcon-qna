import { VoteInterface } from "../../interfaces/global";

export interface QuestionInterface {
  _id?: string;
  title?: string;
  body?: string;
  tags?: Array<string>;
  postedOn?: string | number;
  answers?: any;
  votes: VoteInterface;
  views?: Number;
}
