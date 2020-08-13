export type QuestionType = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuizType = {
  question: string;
  correct_answer: string;
  option: string[];
};
export type questionPropsType = {
  question: string;
  options: string[];
  currentQuestion: number;
  totalQuestion: number;
  callback: (e: React.FormEvent<EventTarget>, ans: string) => void;
};
export type scoreResultPropsType = {
  name: string;
  score: number;
  totalQuestion: number;
  callbackScore: (startingPage: boolean) => void;
};
