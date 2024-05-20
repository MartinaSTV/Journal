interface Ianswear {
  qustion: any;
  questionOne: IQuestionOne;
  subquestions: ISubquestions[];
}
interface IQuestionOne {
  question: string;
}
interface ISubquestions {
  question: string;
  subquestions: [{ subquestion: string }];
  checkBox?: string[];
  textfield?: string;
  textfields?: [{ textfield: string }];
}

interface IresponseForm {
  formdata: IformData;
  formId: string;
}
interface IformData {
  userId: string;
  date: string;
  answer: Ianswear;
  title: string;
  time: string;
  show: string;
  finalised: boolean;
}
