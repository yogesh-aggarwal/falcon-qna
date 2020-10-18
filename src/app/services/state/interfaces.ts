/// GLOBAL DATA INTERFACES
export interface TagInterface {
  name: string;
  color: string;
}

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

export interface GlobalStateInterface {
  questions?: {
    [key: string]: QuestionInterface;
  };
  name?: string;
  tags?: Array<TagInterface>;
}


/// USER INTERFACES
export interface UserInterface {
  id?: string;
  name?: string;
  profileImg?: string;
  email?: string;
  ladoo?: number;
  isSuspended?: boolean;
}

