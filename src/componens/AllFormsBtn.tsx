import { useNavigate } from "react-router-dom";
import dateIcon from "../assets/Icons/calenderIcon.svg";

interface IAllFormsProps {
  data: IresponseForm;
}

const AllFormsBtn = ({ data }: IAllFormsProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        navigate("/form", { state: { formData: data } });
      }}
      className="border shadow-lg max-w-[339px] min-w-[280px] m-5 h-[70px] flex items-center bg-[#F5F5F5] rounded text-xl font-medium md:w-[339px]"
    >
      <p className="ml-5">{data.formdata.title}</p>
      <div className="flex ml-auto mr-5">
        <img src={dateIcon} alt="Kalender ikon" />
        <p className="ml-3">{data.formdata.date}</p>
      </div>
    </button>
  );
};
export default AllFormsBtn;
