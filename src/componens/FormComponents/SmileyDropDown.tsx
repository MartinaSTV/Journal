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
  isDisable: boolean;
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
  isDisable,
}: Itext) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [isHovered, setIsHovered] = useState({ hovered: false, index: -1 });
  const [chosenSmiley, setChosenSmiley] = useState<ISmiley>();

  useEffect(() => {
    const smiley = data.find(
      (data) => data.textValue === formDataState[idxForm]?.qustion
    );
    setChosenSmiley(smiley || undefined);
  }, [formDataState, idxForm, data]);

  const saveSmileytoDatabase = (smiley: ISmiley) => {
    const updatedFormDataState = [...formDataState];
    updatedFormDataState[idxForm].qustion = smiley.textValue;
    saveFromAnswers(updatedFormDataState);
    setFormDataState([...updatedFormDataState]);
  };

  const getBackgroundClass = (
    idx: number,
    smileyValue: number,
    isHovered: boolean
  ) => {
    let baseClass = idx % 2 === 1 ? "bg-[#F5F5F5]" : "bg-white";
    if (isHovered) {
      switch (smileyValue) {
        case 1:
          baseClass = " bg-Green bg-opacity-15";
          break;
        case 2:
          baseClass = " bg-Teal bg-opacity-15";
          break;
        case 3:
          baseClass = " bg-Blue bg-opacity-15";
          break;
        case 4:
          baseClass = " bg-DarkBlue bg-opacity-15";
          break;
        case 5:
          baseClass = " bg-Purple bg-opacity-15";
          break;
        case 6:
          baseClass = " bg-Violet bg-opacity-15";
          break;
        case 7:
          baseClass = " bg-Pink bg-opacity-15";
          break;
        case 8:
          baseClass = " bg-Orange bg-opacity-15";
          break;
        case 9:
          baseClass = " bg-RedOrange bg-opacity-15";
          break;
        case 10:
          baseClass = " bg-Red bg-opacity-15";
          break;
        default:
          break;
      }
    }
    return baseClass;
  };

  return (
    <div className="ml-4 mr-4 mb-5 mt-5">
      <button
        onClick={() => {
          setShowDropDown(!showDropDown);
        }}
        disabled={isDisable === true}
        className={`flex shadow-md rounded-md h-[64px] items-center w-full items-center md:max-w-[400px]  ${
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
              onMouseEnter={() => {
                setIsHovered({ hovered: true, index: idx });
              }}
              onMouseLeave={() => {
                setIsHovered({ hovered: false, index: -1 });
              }}
              key={idx}
              className={`grid grid-cols-6 h-[64px] items-center w-full md:max-w-[400px] ${getBackgroundClass(
                idx,
                smiley.value,
                isHovered.hovered && isHovered.index === idx
              )}`}
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
