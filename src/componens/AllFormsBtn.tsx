import { useNavigate } from "react-router-dom";
import dateIcon from "../assets/Icons/calenderIcon.svg";

interface IAllFormsProps {
  data: IresponseForm;
}

const AllFormsBtn = ({ data }: IAllFormsProps) => {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => {
        navigate("/form", { state: { formData: data } });
      }}
      className="border shadow-lg w-full mt-5 mb-5 h-[70px] flex items-center bg-[#F5F5F5] rounded text-xl font-medium "
    >
      <p className="ml-5 hidden md:block">{data.formdata.title}</p>
      <div className="flex ml-5">
        <img src={dateIcon} alt="Kalender ikon" />
        <p className="ml-3">{data.formdata.date}</p>
      </div>
    </div>
  );
};
export default AllFormsBtn;
