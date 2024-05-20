import { useEffect, useState } from "react";

interface Iinput {
  input: { textfield: string };
  formDataState: Ianswear[];
  idx: number;
  idxForm: number;
  idxSubquestions: number;
}

const Textfields = ({
  input,
  formDataState,
  idx,
  idxForm,
  idxSubquestions,
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

  return (
    <div className=" flex flex-col p-5 md:w-[500px]">
      <label htmlFor="" className="mb-3 font-bold">
        {input.textfield}
      </label>
      <textarea
        defaultValue={defaultV || ""}
        className="shadow-inner rounded mb-5 h-[165px] p-5"
        placeholder="Skriv här"
        name=""
        id=""
      ></textarea>
    </div>
  );
};
export default Textfields;
