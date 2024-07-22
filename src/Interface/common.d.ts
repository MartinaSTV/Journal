interface Ianswear {
  question: any;
  qustion: string;
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
  answer: Ianswear[];
  title: string;
  time: string;
  show: string;
  finalised: boolean;
  dateTimestamp: any;
}
interface IUserData {
  userName: string;
  userId: string;
  forms: [];
  ImgUrl: string;
}

interface IformattedCompilation {
  month: { name: string; valueM: string };
  formData: IresponseForm[];
  averageValue: number;
  anxValues: number[] | [];
  days: Idays[];
}

interface Idays {
  month: { name: string; valueM: string };
  date: string;
  avergeValueDay: number;
  formsDay: IresponseForm[];
}

interface Ioptions {
  scales: {
    y: {
      beginAtZero: boolean;
      min: number;
      max: number;
      ticks: {
        stepSize: number;
      };
    };
  };
}

interface ITextField2 {
  textfield: string;
}

interface ISubquestion2 {
  subquestion: string;
  checkBox?: string[];
  textfield?: string;
  textfields?: ITextField2[];
}

interface IQuestion2 {
  qustion?: string;
  question?: string;
  subquestions?: ISubquestion2[];
}
