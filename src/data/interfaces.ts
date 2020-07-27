export interface QuestionInterface {
  id: string;
  title: string;
  desc: string;
}

export interface StateInterface {
  questions?: Array<QuestionInterface>;
  name?: string;
}
