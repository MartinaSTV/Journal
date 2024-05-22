import blueArrow from "../../assets/Icons/BlueArrow.svg";
import { useEffect, useState } from "react";

interface Itext {
  value: { text: string; value: string };
  type: string;
  data: ISmiley[];
  formDataState: Ianswear[];
  idxForm: number;
  saveFromAnswers: (answers: Ianswear[]) => Promise<void>;
  setFormDataState: (formDataState: Ianswear[]) => void;
}
interface ISmiley {
  img: string;
  value: number;
  textValue: string;
}

const DropDown = ({
  value,
  type,
  data,
  formDataState,
  idxForm,
  saveFromAnswers,
  setFormDataState,
}: Itext) => {
  // TODO default value glappar
  const [showDropDown, setShowDropDown] = useState(false);
  const [isHovered, setIsHovered] = useState({ hovered: false, index: -1 });
  const [chosenSmiley, setChosenSmiley] = useState<ISmiley>();

  useEffect(() => {
    const smiley = [];
    for (let i = 0; i < data.length; i++) {
      if (formDataState[idxForm]?.qustion) {
        if (data[i].textValue === formDataState[idxForm].qustion) {
          const choseExist = {
            img: data[i].img,
            value: data[i].value,
            textValue: formDataState[idxForm].qustion,
          };
          smiley.push(choseExist);
        }
      }
    }

    setChosenSmiley(smiley[0]);
  }, [formDataState, idxForm]);

  const saveSmileytoDatabase = (smiley: ISmiley) => {
    const updatedFormDataState = [...formDataState];
    updatedFormDataState[idxForm].qustion = smiley.textValue;
    saveFromAnswers(updatedFormDataState);
    setFormDataState([...updatedFormDataState]);
  };

  return (
    <div className="ml-4 mr-4 mb-5 mt-5">
      <button
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        className={`flex shadow-md rounded-md  h-[64px] items-center w-full items-center  md:max-w-[400px]  ${
          chosenSmiley ? "bg-white border border-[#0F69BD]" : "bg-[#0F69BD]"
        }`}
      >
        {chosenSmiley && type === "Hur är din ångest/oro nu?" ? (
          <img
            src={chosenSmiley?.img}
            alt={` ${chosenSmiley.textValue} smiley`}
            className="ml-5"
          />
        ) : chosenSmiley ? (
          <p className="font-medium ml-5">
            {chosenSmiley ? chosenSmiley.value : value.text}
          </p>
        ) : (
          ""
        )}

        <p
          className={` ${
            chosenSmiley ? "text-black" : "text-white"
          } font-medium ml-auto `}
        >
          {chosenSmiley ? chosenSmiley.textValue : value.text}
        </p>
        <div className="rounded-full bg-white ml-auto mr-5">
          <img src={blueArrow} alt="pil som pekar ner" className="p-2" />
        </div>
      </button>
      <section className="h-fit">
        {showDropDown &&
          data?.map((smiley, idx) => (
            <button
              onClick={() => {
                setShowDropDown(false);
                setChosenSmiley(smiley);
                saveSmileytoDatabase(smiley);
              }}
              onMouseEnter={() => setIsHovered({ hovered: true, index: idx })}
              onMouseLeave={() => setIsHovered({ hovered: false, index: idx })}
              key={idx}
              className={`grid grid-cols-6 h-[64px] items-center w-full md:max-w-[400px]
              } ${idx % 2 === 1 ? "bg-[#F5F5F5]" : "bg-white"}  ${
                isHovered.hovered && isHovered.index === idx
                  ? smiley.value === 1
                    ? "bg-[#0FBD7E] bg-opacity-15"
                    : smiley.value === 2
                    ? "bg-[#2EC3B1] bg-opacity-15"
                    : smiley.value === 3
                    ? "bg-[#14A0DC] bg-opacity-15"
                    : smiley.value === 4
                    ? "bg-[#0F69BD] bg-opacity-15"
                    : smiley.value === 5
                    ? "bg-[#4D2CD2] bg-opacity-15"
                    : smiley.value === 6
                    ? "bg-[#A43DF4] bg-opacity-15"
                    : smiley.value === 7
                    ? "bg-[#F73B95] bg-opacity-15"
                    : smiley.value === 8
                    ? "bg-[#F77313] bg-opacity-15"
                    : smiley.value === 9
                    ? "bg-[#DA582F] bg-opacity-15"
                    : smiley.value === 10
                    ? "bg-[#E70B0B] bg-opacity-15"
                    : ""
                  : ""
              }`}
            >
              {type === "Hur är din ångest/oro nu?" && (
                <img
                  src={smiley.img}
                  alt={`${smiley.textValue} smiley`}
                  className="mr-auto ml-5 col-span-1"
                />
              )}
              <p className="ml-auto font-medium  col-span-1">{smiley.value}</p>
              <p className="col-span-4 font-medium">{smiley.textValue}</p>
            </button>
          ))}
      </section>
    </div>
  );
};
export default DropDown;
