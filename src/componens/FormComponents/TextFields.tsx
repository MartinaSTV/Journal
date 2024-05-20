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
  return (
    <div className=" flex flex-col p-5 md:w-[500px]">
      <label htmlFor="" className="mb-3 font-bold">
        {input.textfield}
      </label>
      <textarea
        defaultValue={
          formDataState[idxForm]?.subquestions[idxSubquestions]?.textfields[idx]
            ?.textfield || ""
        }
        className="shadow-inner rounded mb-5 h-[165px] p-5"
        placeholder="Skriv här"
        name=""
        id=""
      ></textarea>
    </div>
  );
};
export default Textfields;
