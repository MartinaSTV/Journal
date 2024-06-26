import chartIcon from "../../assets/Icons/chartIcon.svg";

interface IOnClickChart {
  OnClickChart: () => void;
}

const ButtonChart = ({ OnClickChart }: IOnClickChart) => {
  return (
    <button
      onClick={() => {
        OnClickChart();
      }}
      className="hover:bg-white border border-gray bg-[#F5F5F5] h-[40px] w-[50px] rounded-md ml-auto mr-10 flex items-center justify-center"
    >
      <img src={chartIcon} alt="Ikon diagram" />
    </button>
  );
};
export default ButtonChart;
