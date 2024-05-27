import { useEffect, useState } from "react";
import Sad from "../../assets/Smileys/BlueSadSmiley.svg";
import Happy from "../../assets/Smileys/greenSmiley.svg";
import Angry from "../../assets/Smileys/RedAngrySmiley.svg";
import Worried from "../../assets/Smileys/WorriedPurpleSmiley.svg";
import YellowElse from "../../assets/Smileys/yellowStraightSmiley.svg";

interface IfeelingsProps {
  formDataState: Ianswear[];
  idxForm: number;
  saveFromAnswers: (answers: Ianswear[]) => Promise<void>;
  setFormDataState: (formDataState: Ianswear[]) => void;
}

const Feelings = ({
  formDataState,
  idxForm,
  saveFromAnswers,
  setFormDataState,
}: IfeelingsProps) => {
  const [chosenFeeling, setChoseFeeling] = useState({ feelingC: "", idx: -1 });
  const smileys = [
    { img: Happy, text: "Glad", color: "border-[#0FBD7E]" },
    { img: Sad, text: "Ledsen", color: "border-[#0F69BD] border-opacity-50" },
    { img: Angry, text: "Arg", color: "border-[#F12B2B]" },
    { img: Worried, text: "Orolig", color: "border-[#9747FF]" },
    { img: YellowElse, text: "Annat", color: "border-[#FFD747]" },
  ];

  useEffect(() => {
    if (
      formDataState &&
      formDataState[idxForm] &&
      formDataState[idxForm].qustion
    ) {
      let foundFeeling = null;
      for (let i = 0; i < smileys.length; i++) {
        if (smileys[i].text === formDataState[idxForm].qustion) {
          foundFeeling = { feelingC: smileys[i].text, idx: i };
          break;
        }
      }

      if (foundFeeling) {
        setChoseFeeling(foundFeeling);
      }
    }
  }, [formDataState, idxForm]);

  const saveSmileytoDatabase = (smiley: string) => {
    const updatedFormDataState = [...formDataState];
    updatedFormDataState[idxForm].qustion = smiley;
    saveFromAnswers(updatedFormDataState);
    setFormDataState([...updatedFormDataState]);
  };

  return (
    <button className="flex justify-around mt-5 mb-10 md:w-[500px]">
      {smileys.map((feeling, idx) => (
        <div
          onClick={() => {
            saveSmileytoDatabase(feeling.text);
            setChoseFeeling({ feelingC: feeling.text, idx: idx });
          }}
          className="flex flex-col cursor-pointer"
          key={idx + "feeling"}
        >
          <img
            src={feeling.img}
            alt={feeling.text}
            className={`h-[55px] w-[55px] rounded-full p-2 hover:opacity-80 hover:shadow-inner transition-all ${
              chosenFeeling.feelingC === feeling.text &&
              chosenFeeling.idx === idx
                ? `border-4 ${feeling.color}`
                : ""
            }`}
          />
          <h3 className="mt-5 font-medium">{feeling.text}</h3>
        </div>
      ))}
    </button>
  );
};
export default Feelings;
