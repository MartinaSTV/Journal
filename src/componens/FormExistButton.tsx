import clock from "../../public/Icons/ph_clock.svg";

interface IformDataProps {
  formData: IformData;
}

const FormExistButton = ({ formData }: IformDataProps) => {
  return (
    <button className="border max-w-[339px] m-5 h-[70px] flex items-center bg-[#F5F5F5] rounded text-xl font-medium md:w-[339px]">
      <h4 className="ml-auto mr-auto">{formData.title}</h4>
      <div className="mr-5 flex">
        <img src={clock} alt="klocka" className="mr-2" />
        <p>{formData.show}</p>
      </div>
    </button>
  );
};
export default FormExistButton;
