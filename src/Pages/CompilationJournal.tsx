import MenuBig from "../componens/MenyBig";
import MenuBottomBar from "../componens/MenyBottomBar";
import bgBig from "../assets/bgBig.png";
import { useEffect, useState } from "react";
import { onChangeAuth } from "../Service/LoginService";
import { useRecoilState } from "recoil";
import User from "../atoms/user";
import { getForms } from "../Service/allformService";
import { formatData } from "../Service/CompilationService";
import Months from "../componens/CompilationJournalComponents/Months";
import chartIcon from "../assets/Icons/chartIcon.svg";

//TODO on click visa diagram
// TODO on click på månad visa alla data för månaden
// TODO refraktorera
const CompilationJournal = () => {
  const [userId, setUserId] = useRecoilState(User);
  const [allForms, setAllForms] = useState<IresponseForm[]>([]);
  const [allFormsChosen, setAllFormsChosen] = useState<IformattedCompilation[]>(
    []
  );
  const [opendYears, setOpendYears] = useState(false);
  const [years, setYears] = useState<string[]>([]);
  onChangeAuth(setUserId);

  useEffect(() => {
    sessionStorage.setItem("formDataState", JSON.stringify(""));
    const getData = async () => {
      const forms = await getForms(userId);
      if (forms !== undefined) {
        const isFinalised = forms.filter(
          (data) => data.formdata.finalised === true
        );
        setAllForms([...isFinalised]);
        getYears(isFinalised);
      }
    };

    getData();
  }, [userId]);

  const getYears = (isFinalised: IresponseForm[]) => {
    const allyears = [];
    for (let i = 0; i < isFinalised.length; i++) {
      allyears.push(isFinalised[i].formdata.date.split("-")[0]);
    }
    const uniqueYears = [...new Set(allyears)];
    setYears([...uniqueYears]);
  };

  const formateData = (year: string) => {
    const chosenForms = allForms
      .filter((form) => year === form.formdata.date.split("-")[0])
      .sort((a, b) => {
        const monthA: any = a.formdata.dateTimestamp.toDate();
        const monthB: any = b.formdata.dateTimestamp.toDate();
        return monthA.getTime() - monthB.getTime();
      });

    const formattedData = formatData(chosenForms);
    setAllFormsChosen([...formattedData]);
  };

  return (
    <section
      className="flex flex-col max-w-[1500px] ml-auto mr-auto "
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${bgBig})`,
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <MenuBig />
      <h1 className="text-white text-4xl font-normal mt-10 ml-5 max-w-[300px] md:text-5xl md:max-w-full ">
        Sammanställning
      </h1>
      <article className="text-white flex flex-col min-h-[100vh]">
        <div className="flex flex-col mt-10">
          <label
            htmlFor="year"
            className={`ml-5 h-[40px] font-bold w-[100px] hover:bg-white text-black  flex items-center justify-center bg-[#F5F5F5] ${
              opendYears ? "rounded-t" : " rounded"
            }`}
            onClick={() => {
              setOpendYears(!opendYears);
            }}
          >
            Välj år
          </label>
          <div className="flex flex-col">
            {opendYears &&
              years.map((y, idx) => (
                <button
                  key={idx}
                  className={`mr-auto ml-5 flex  text-black items-center justify-center w-[100px]  ${
                    idx % 2 === 0 ? "bg-white" : "bg-[#F5F5F5]"
                  }`}
                  id={`year ${idx}`}
                  onClick={() => {
                    formateData(y);
                    setOpendYears(false);
                  }}
                >
                  {y}
                </button>
              ))}
          </div>
        </div>
        {allFormsChosen.length > 0 &&
          allFormsChosen[0] &&
          allFormsChosen[0].formData.length > 0 && (
            <div className="flex items-center">
              <h2 className="ml-5 text-xl font-medium mt-10">
                {allFormsChosen[0].formData[0].formdata?.date.split("-")[0]}
              </h2>
              <button className="hover:bg-white bg-[#F5F5F5] h-[40px] w-[50px] rounded-md ml-auto mr-10 mt-auto flex items-center justify-center">
                <img src={chartIcon} alt="Ikon diagram" />
              </button>
            </div>
          )}

        {allFormsChosen.map((chosenMonth, idx) => (
          <Months key={idx + "Months"} chosenMonth={chosenMonth} />
        ))}
      </article>
      <section className="w-full sticky bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};

export default CompilationJournal;
