import clock from "../assets/Icons/ph_clock.svg";
import { useNavigate } from "react-router-dom";
import lock from "../assets/Icons/LockYellow.svg";
import checkMark from "../assets/checkedMark.svg";

interface IformDataProps {
  formData: { formdata: IformData; formId: string };
}

const FormExistButton = ({ formData }: IformDataProps) => {
  const navigate = useNavigate();

  const isDisabled = () => {
    /*   const times = ["07.30", "11.30", "15.00", "20.00"];
    const today = new Date();
    const currentTime = today.getTime();

    for (let i = 0; i < times.length; i++) {
      if (formData.formdata.show === times[i]) {
        const nextTime = times[i + 1];
        if (!nextTime) {
          return true;
        }
        const [hours, minutes] = nextTime
          .split(".")
          .map((n) => parseInt(n, 10));
        const formDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          hours,
          minutes || 0
        );
        const formdateTime = formDate.getTime();

        return currentTime <= formdateTime;
      }
    } */
    return false;
  };

  return (
    <button
      disabled={isDisabled()}
      onClick={() => {
        navigate("/form", { state: { formData: formData } });
      }}
      className={`border max-w-[339px] m-5 h-[70px]  flex items-center bg-[#F5F5F5] rounded text-xl font-medium md:w-[339px] `}
    >
      {formData.formdata.finalised === true && (
        <img src={checkMark} alt="bock" className="ml-5" />
      )}
      {isDisabled() && <img src={lock} alt="lås" className="ml-5" />}
      <h4 className="ml-auto mr-auto">{formData.formdata.title}</h4>
      <div className="mr-5 flex">
        <img src={clock} alt="klocka" className="mr-2" />
        <p>{formData.formdata.show}</p>
      </div>
    </button>
  );
};
export default FormExistButton;
