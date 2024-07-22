import Textfields from "../componens/FormComponents/TextFields";
import CheckBoxForm from "../componens/FormComponents/CheckBoxForm";
import DropDown from "../componens/FormComponents/SmileyDropDown";
import { Questions } from "../componens/FormComponents/formQuestions";
import Feelings from "../componens/FormComponents/Feelings";
import yellowDateIcon from "../assets/Icons/yellowDate.svg";
import pinkClock from "../assets/Icons/ph_clock.svg";
import bgBig from "../assets/bgBig.png";
import { useEffect, useState } from "react";
import { feelingsList } from "../componens/FormComponents/formQuestions";
import { smileys } from "../componens/FormComponents/formQuestions";
import MenuBottomBar from "../componens/MenyBottomBar";
import MenuBig from "../componens/MenyBig";
import { useLocation } from "react-router-dom";
import { updateFormAnswer, updateIsFinalised } from "../Service/journalService";
import { onChangeAuth } from "../Service/LoginService";
import { useRecoilState } from "recoil";
import UserAtom from "../atoms/user";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [, setUserId] = useRecoilState(UserAtom);
  onChangeAuth(setUserId);

  const [value] = useState({
    text: "Välj här",
    value: "",
  });
  const date = new Date();
  const todaysDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const hours = date.getHours();
  const min = date.getMinutes();
  const data = useLocation();
  const navigate = useNavigate();

  const initialFormDataState =
    JSON.parse(sessionStorage.getItem("formDataState") as string) ||
    data.state.formData.formdata.answer;
  const [formDataState, setFormDataState] =
    useState<Ianswear[]>(initialFormDataState);

  const formId = data.state.formData.formId;
  const isDisableT = data.state.formData.formdata.finalised;

  useEffect(() => {
    sessionStorage.setItem("formDataState", JSON.stringify(formDataState));
  }, [formDataState]);

  useEffect(() => {
    const savedFormData = sessionStorage.getItem("formDataState");
    if (savedFormData) {
      setFormDataState(JSON.parse(savedFormData));
    }
  }, []);

  const onblurTextArea = (
    e: React.FocusEvent<HTMLTextAreaElement>,
    idxForm: number,
    idxSubquestions: number
  ) => {
    const newValue = e.target.value;
    const updatedFormDataState = [...formDataState];

    if (
      updatedFormDataState[idxForm] &&
      updatedFormDataState[idxForm].subquestions
    ) {
      if (
        updatedFormDataState[idxForm].subquestions[idxSubquestions] &&
        updatedFormDataState[idxForm].subquestions[idxSubquestions]
          .textfield !== undefined
      ) {
        updatedFormDataState[idxForm].subquestions[idxSubquestions].textfield =
          newValue;
      }
    }

    setFormDataState([...updatedFormDataState]);
    saveFromAnswers(updatedFormDataState);
  };

  const saveFromAnswers = async (answear: Ianswear[]) => {
    try {
      await updateFormAnswer(formId, answear);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-[1500px] ml-auto mr-auto bg-[#F5F5F5] relative ">
      <MenuBig />
      <div
        className="flex items-center max-w-[1500px] bg-[#F5F5F5] relative "
        style={{
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${bgBig})`,
          backgroundSize: "cover",
          height: "100px",
        }}
      >
        <h1 className=" ml-5 text-white text-4xl ">
          {data.state.formData.formdata.title}
        </h1>
      </div>
      <article className="flex max-w-[800px] mt-5 md:self-center ">
        <div className="flex mr-auto min-w-[150px] ml-5 md:w-[400px]">
          <img src={yellowDateIcon} alt="Kaldender" className="mr-2" />
          <p>{todaysDate}</p>
        </div>
        <div className="flex ml-auto mr-5  md:w-[400px]">
          <img src={pinkClock} alt="Klocka" className="mr-2 ml-auto" />
          <p>{`${hours}.${min}`}</p>
        </div>
      </article>
      <form
        className="max-w-[800px] flex flex-col ml-auto mr-auto "
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {Questions.map((question, idxForm) => (
          <div className="flex flex-col pt-10 pb-10" key={idxForm + "Form"}>
            <h2 className="text-xl ml-5 font-medium">{question.question}</h2>
            {question.question === "Hur är din ångest/oro nu?" ? (
              <DropDown
                value={value}
                type={question.question}
                data={smileys}
                formDataState={formDataState}
                idxForm={idxForm}
                setFormDataState={setFormDataState}
                saveFromAnswers={saveFromAnswers}
                isDisable={isDisableT}
              />
            ) : (
              <Feelings
                formDataState={formDataState}
                idxForm={idxForm}
                setFormDataState={setFormDataState}
                saveFromAnswers={saveFromAnswers}
                isDisable={isDisableT}
              />
            )}
            <section>
              {question.subquestions?.map((subquestion, idxSubquestions) => (
                <div className="flex flex-col" key={idxSubquestions}>
                  <h2
                    id="subquestionHeader"
                    className="ml-5 font-medium text-xl"
                  >
                    {subquestion.subquestion}
                  </h2>
                  {subquestion.subquestion === "Hur stark är din känsla?" && (
                    <DropDown
                      value={value}
                      type={question.qustion}
                      data={feelingsList}
                      formDataState={formDataState}
                      idxForm={idxForm}
                      setFormDataState={setFormDataState}
                      saveFromAnswers={saveFromAnswers}
                      isDisable={isDisableT}
                    />
                  )}
                  {subquestion.checkBox &&
                    subquestion.checkBox.map((checkBox, index) => (
                      <CheckBoxForm
                        key={index}
                        checkBox={checkBox}
                        index={index}
                        formDataState={formDataState}
                        idxSubquestions={idxSubquestions}
                        idxForm={idxForm}
                        setFormDataState={setFormDataState}
                        saveFromAnswers={saveFromAnswers}
                        isDisable={isDisableT}
                      />
                    ))}
                  {
                    <div className="flex flex-col mb-5">
                      <label
                        htmlFor={`subquestionTextField+${idxSubquestions}+${idxForm}form`}
                        className="ml-5 font-medium"
                      >
                        {subquestion.textfield}
                      </label>
                      {subquestion.textfield ===
                        "Beskriv med ord varför du känner som du gör?" && (
                        <textarea
                          onBlur={(e) => {
                            onblurTextArea(e, idxForm, idxSubquestions);
                          }}
                          defaultValue={
                            formDataState[idxForm]?.subquestions?.[
                              idxSubquestions
                            ]?.textfield || ""
                          }
                          name=""
                          id={`subquestionTextField+${idxSubquestions}+${idxForm}form`}
                          className="shadow-inner rounded  m-5 h-[165px] p-5"
                          placeholder="Skriv här"
                          disabled={isDisableT === true}
                        ></textarea>
                      )}
                    </div>
                  }

                  {subquestion.textfields &&
                    subquestion.textfields.map((input, idx) => (
                      <Textfields
                        key={idx + "input"}
                        input={input}
                        formDataState={formDataState}
                        setFormDataState={setFormDataState}
                        idx={idx}
                        idxSubquestions={idxSubquestions}
                        idxForm={idxForm}
                        saveFromAnswers={saveFromAnswers}
                        isDisable={isDisableT}
                      />
                    ))}
                </div>
              ))}
            </section>
          </div>
        ))}
        <button
          onClick={async () => {
            try {
              await updateIsFinalised(data.state.formData.formId);
              setTimeout(() => {
                navigate("/Journal");
              }, 1000);
              // visa medelande att formuläret är sparat som klart.
            } catch (error) {
              console.log(error);
            }
          }}
          type="submit"
          className="bg-black text-2xl mr-auto ml-auto tracking-widest font-bold bg-opacity-65 text-white rounded mb-10 w-[300px] h-[72px]"
        >
          Spara/ Klar
        </button>
      </form>
      <section className="w-full sticky bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </div>
  );
};
export default Form;
