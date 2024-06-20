import MenuBig from "../componens/MenyBig";
import MenuBottomBar from "../componens/MenyBottomBar";
import bgBig from "../assets/bgBig.png";
import { useEffect, useState } from "react";
import { onChangeAuth } from "../Service/LoginService";
import { useRecoilState } from "recoil";
import User from "../atoms/user";
import { getForms } from "../Service/allformService";
import { formatData } from "../Service/CompilationService";

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
            className="ml-5 rounded h-[40px]  w-[200px] bg-white text-black"
            onClick={() => {
              setOpendYears(!opendYears);
            }}
          >
            Välj år
          </label>
          {opendYears &&
            years.map((y, idx) => (
              <button
                key={idx}
                className="mr-auto ml-5"
                id={`year ${idx}`}
                onClick={() => {
                  formateData(y);
                }}
              >
                {y}
              </button>
            ))}
        </div>

        {allFormsChosen.map((chosenMonth, idx) => (
          <button key={idx + "month"}>
            <h2>{chosenMonth.month.name}</h2>
          </button>
        ))}
      </article>
      <section className="w-full sticky bottom-0 block md:hidden">
        <MenuBottomBar />
      </section>
    </section>
  );
};

export default CompilationJournal;
