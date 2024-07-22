import { useState } from "react";
import { smileys } from "../FormComponents/formQuestions";
import Days from "./Days";

interface IMonths {
  chosenMonth: IformattedCompilation;
}

const Months = ({ chosenMonth }: IMonths) => {
  const [opendbutton, setOpendButton] = useState(false);
  const getSmiley = () => {
    const miley = smileys.filter(
      (smiley) => smiley.value === chosenMonth.averageValue
    );
    return miley[0].img;
  };

  return (
    <>
      <button
        onClick={() => {
          setOpendButton(!opendbutton);
        }}
        className={`ml-5 mr-5 mt-5 border text-black h-[70px] max-w-[1500px] flex items-center bg-[#F5F5F5] text-xl font-medium hover:bg-white ${
          opendbutton ? "border-none rounded-t" : "rounded"
        }`}
      >
        <h3 className="ml-10">{chosenMonth?.month.name}</h3>
        <p className="ml-auto">{chosenMonth.averageValue}</p>
        <img className="mr-5 ml-5" src={getSmiley()} alt="Smiley gubbe " />
      </button>
      {opendbutton && <Days chosenMonth={chosenMonth} />}
    </>
  );
};
export default Months;
