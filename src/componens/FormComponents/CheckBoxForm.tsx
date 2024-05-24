import { useEffect, useState } from "react";
import checkboxImg from "../../assets/checkboxImg.svg";
import checkmark from "../../assets/checkedMark.svg";

interface IcheckBox {
  checkBox: string;
  index: number;
  formDataState: Ianswear[];
  idxSubquestions: number;
  idxForm: number;
  saveFromAnswers: (answers: Ianswear[]) => Promise<void>;
  setFormDataState: (formDataState: Ianswear[]) => void;
}

//TODO- bugg på klicket som är långsamt

const CheckBoxForm = ({
  checkBox,
  index,
  formDataState,
  idxSubquestions,
  idxForm,
  saveFromAnswers,
  setFormDataState,
}: IcheckBox) => {
  const [chosenBox, setChosenBox] = useState({
    idx: -1,
    textValue: "",
  });
  let updatedIndex;
  useEffect(() => {
    const checkBoxValue =
      formDataState?.[idxForm]?.subquestions?.[idxSubquestions]?.checkBox?.[
        index
      ];
    updatedIndex = checkBoxValue !== "" ? index : -1;
    const updatedTextValue =
      checkBoxValue !== "" && checkBoxValue !== undefined ? checkBoxValue : "";

    setChosenBox({
      idx: updatedIndex,
      textValue: updatedTextValue,
    });
  }, [formDataState, idxForm, idxSubquestions, index]);

  const saveToDatabase = (value: string) => {
    const updatedFormDataState = [...formDataState];

    if (
      updatedFormDataState[idxForm]?.subquestions?.[idxSubquestions]
        ?.checkBox?.[index] !== undefined
    ) {
      updatedFormDataState[idxForm].subquestions[idxSubquestions].checkBox![
        index
      ] = value;
    }

    setFormDataState([...updatedFormDataState]);
    saveFromAnswers(updatedFormDataState);
  };

  return (
    <div className="flex ml-5 mb-5 items-center mt-5 relative">
      <label
        htmlFor={`checkbox-${idxForm}-${idxSubquestions}-${index}`}
        className="font-medium mr-4"
      >
        {checkBox}
      </label>

      <img
        src={checkboxImg}
        alt="checkbox"
        className=" h-[40px] w-[40px] absolute right-5"
      />
      {chosenBox.idx === index && (
        <img
          src={checkmark}
          alt="Bock"
          className=" h-[40px] w-[40px] absolute bottom-0  right-5"
        />
      )}
      <input
        onChange={(e) => {
          if (e.target.checked) {
            setChosenBox({ idx: index, textValue: e.target.value });
            saveToDatabase(e.target.value);
          } else {
            console.log("klick4");
            setChosenBox({ idx: -1, textValue: "" });
            saveToDatabase("");
          }
        }}
        type="checkbox"
        className="h-[40px] w-[40px] absolute right-5  opacity-0"
        value={checkBox}
        name={`checkbox+${index}`}
        id={`checkbox-${idxForm}-${idxSubquestions}-${index}`}
        defaultChecked={updatedIndex !== ""}
      />
    </div>
  );
};
export default CheckBoxForm;
