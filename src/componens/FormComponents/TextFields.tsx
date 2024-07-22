import { useEffect, useState } from "react";

interface Iinput {
  input: { textfield: string };
  formDataState: any[];
  idx: number;
  idxForm: number;
  idxSubquestions: number;
  saveFromAnswers: (answers: Ianswear[]) => Promise<void>;
  setFormDataState: (formDataState: Ianswear[]) => void;
  isDisable: boolean;
}

const Textfields = ({
  input,
  formDataState,
  idx,
  idxForm,
  idxSubquestions,
  saveFromAnswers,
  setFormDataState,
  isDisable,
}: Iinput) => {
  const [defaultV, setDefaultV] = useState<string>("");

  useEffect(() => {
    let defaultValue: string = "";

    const form = formDataState?.[idxForm];
    const subquestions = form?.subquestions?.[idxSubquestions];
    const textfields = subquestions?.textfields?.[idx];

    if (textfields?.textfield !== undefined) {
      defaultValue = textfields.textfield;
    }
    setDefaultV(defaultValue);
  }, [formDataState, idxForm, idxSubquestions, idx]);

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const updatedFormDataState = [...formDataState];

    if (
      updatedFormDataState[idxForm]?.subquestions?.[idxSubquestions]
        ?.textfields?.[idx]?.textfield !== undefined
    ) {
      updatedFormDataState[idxForm].subquestions[idxSubquestions].textfields![
        idx
      ].textfield = newValue;
    }

    setFormDataState([...updatedFormDataState]);
    saveFromAnswers(updatedFormDataState);
  };

  return (
    <div className="flex flex-col p-5 md:w-[500px]">
      <label htmlFor={`textarea-${idx}`} className="mb-3 font-bold">
        {input.textfield}
      </label>
      <textarea
        id={`textarea-${idx}`}
        onBlur={handleBlur}
        onChange={(e) => setDefaultV(e.target.value)}
        defaultValue={defaultV}
        className="shadow-inner rounded mb-5 h-[165px] p-5"
        placeholder="Skriv här"
        disabled={isDisable === true}
      />
    </div>
  );
};

export default Textfields;
