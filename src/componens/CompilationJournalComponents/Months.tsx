import { smileys } from "../FormComponents/formQuestions";

interface IMonths {
  chosenMonth: IformattedCompilation;
}

const Months = ({ chosenMonth }: IMonths) => {
  const getSmiley = () => {
    const miley = smileys.filter(
      (smiley) => smiley.value === chosenMonth.averageValue
    );
    return miley[0].img;
  };

  return (
    <button className="ml-5 border text-black max-w-[339px] m-5 h-[70px]  flex items-center bg-[#F5F5F5] rounded text-xl font-medium md:w-[339px] hover:bg-white ">
      <h3 className="ml-10">{chosenMonth?.month.name}</h3>
      <p className="ml-auto">{chosenMonth.averageValue}</p>
      <img className="mr-5 ml-5" src={getSmiley()} alt="Smiley gubbe " />
    </button>
  );
};
export default Months;
