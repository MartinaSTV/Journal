import { useEffect, useState } from "react";
import Sad from "../../assets/Smileys/BlueSadSmiley.svg";
import Happy from "../../assets/Smileys/greenSmiley.svg";
import Angry from "../../assets/Smileys/RedAngrySmiley.svg";
import Worried from "../../assets/Smileys/WorriedPurpleSmiley.svg";
import YellowElse from "../../assets/Smileys/yellowStraightSmiley.svg";

interface IfeelingsProps {
  formDataState: Ianswear[];
  idxForm: number;
}

const Feelings = ({ formDataState, idxForm }: IfeelingsProps) => {
  const [chosenFeeling, setChoseFeeling] = useState({ feeling: "", idx: -1 });
  const smileys = [
    { img: Happy, text: "Glad", color: "border-[#0FBD7E]" },
    { img: Sad, text: "Ledsen", color: "border-[#0F69BD] border-opacity-50" },
    { img: Angry, text: "Arg", color: "border-[#F12B2B]" },
    { img: Worried, text: "Orolig", color: "border-[#9747FF]" },
    { img: YellowElse, text: "Annat", color: "border-[#FFD747]" },
  ];

  useEffect(() => {
    const Feeling = [];
    for (let i = 0; i < smileys.length; i++) {
      if (smileys[i].text === formDataState[idxForm].qustion.qustion) {
        const choseExist = {
          feeling: smileys[i].text,
          idx: smileys[i],
        };
        Feeling.push(choseExist);
      }
    }

    if (Feeling.length > 0) {
      setChoseFeeling(Feeling[0]);
    }
  }, []);

  return (
    <button className="flex justify-around mt-5 mb-10 md:w-[500px]">
      {smileys.map((feeling, idx) => (
        <div
          onClick={() => {
            setChoseFeeling({ feeling: feeling.text, idx: idx });
          }}
          className="flex flex-col"
          key={idx + "feeling"}
        >
          <img
            src={feeling.img}
            alt={feeling.text}
            className={`h-[55px] w-[55px] rounded-full p-2 transition-all ${
              chosenFeeling.feeling === feeling.text &&
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
