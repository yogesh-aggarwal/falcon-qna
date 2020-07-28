export interface VotesInterface {
  total?: number;
  upVoters?: Array<string>;
  downVoters?: Array<string>;
}

export interface AnswerInterface {
  id?: string;
  body?: string;
  votes?: VotesInterface;
}

export interface QuestionInterface {
  id?: string;
  title?: string;
  content?: string;
  tags?: Array<string>;
  views?: number;
  postedOn?: Date;
  editedOn?: Date;
  answers?: {
    [key: string]: AnswerInterface;
  };
  votes?: VotesInterface;
}

export interface StateInterface {
  questions?: {
    [key: string]: QuestionInterface;
  };
  name?: string;
}
