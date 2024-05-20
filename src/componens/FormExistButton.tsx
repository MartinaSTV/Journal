import clock from "../assets/Icons/ph_clock.svg";
import { useNavigate } from "react-router-dom";

interface IformDataProps {
  formData: { formdata: IformData; formId: string };
}

const FormExistButton = ({ formData }: IformDataProps) => {
  const navigate = useNavigate();

  return (
    <button
      disabled={formData.formdata.finalised}
      onClick={() => {
        navigate("/form", { state: { formData: formData } });
      }}
      className="border max-w-[339px] m-5 h-[70px] flex items-center bg-[#F5F5F5] rounded text-xl font-medium md:w-[339px]"
    >
      <h4 className="ml-auto mr-auto">{formData.formdata.title}</h4>
      <div className="mr-5 flex">
        <img src={clock} alt="klocka" className="mr-2" />
        <p>{formData.formdata.show}</p>
      </div>
    </button>
  );
};
export default FormExistButton;
