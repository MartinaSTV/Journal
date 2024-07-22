import { addAnsweToQuestionfunc } from "../../Service/CompilationService";
import { Questions } from "../FormComponents/formQuestions";

interface IAnswersForm {
  data: IresponseForm;
}

const AnswearsInday = ({ data }: IAnswersForm) => {
  const getAllAnswearAndQuestions = addAnsweToQuestionfunc(data, Questions);

  return (
    <article className="mt-5 ml-5">
      {getAllAnswearAndQuestions?.length > 0 ? (
        getAllAnswearAndQuestions?.map((item, idx) => (
          <article key={idx + "compilationAnsw"} className="flex flex-col mb-5">
            <p className="">{item.question}</p>
            <p className="font-medium">{item.answ}</p>
          </article>
        ))
      ) : (
        <p>Hittar ingen data</p>
      )}
    </article>
  );
};
export default AnswearsInday;
