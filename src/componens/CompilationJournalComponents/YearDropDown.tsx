import { useState } from "react";

interface ISerachByDate {
  years: string[];
  formateData: (year: string) => void;
}

const YearDropDown = ({ years, formateData }: ISerachByDate) => {
  const [opendYears, setOpendYears] = useState(false);

  return (
    <div className="flex flex-col mt-10">
      <button
        className={`ml-5 h-[40px] font-bold w-[100px] hover:bg-white text-black  flex items-center justify-center bg-[#F5F5F5] ${
          opendYears ? "rounded-t" : " rounded"
        }`}
        onClick={() => {
          setOpendYears(!opendYears);
        }}
      >
        Välj år
      </button>
      <div className="flex flex-col">
        {opendYears &&
          years.map((y, idx) => (
            <button
              key={idx}
              className={`mr-auto ml-5 flex  text-black items-center justify-center w-[100px]  ${
                idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
              } ${idx - 1 && "rounded-b"}`}
              id={`year${idx}`}
              onClick={() => {
                formateData(y);
                setOpendYears(false);
              }}
            >
              {y}
            </button>
          ))}
      </div>
    </div>
  );
};
export default YearDropDown;
