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
import YearDropDown from "../componens/CompilationJournalComponents/YearDropDown";
import Chart from "../componens/CompilationJournalComponents/Chart";
import ButtonChart from "../componens/CompilationJournalComponents/ButtonChart";

//TODO on click visa diagram
// TODO on click på månad visa alla data för månaden

const CompilationJournal = () => {
  const [userId, setUserId] = useRecoilState(User);
  const [allForms, setAllForms] = useState<IresponseForm[]>([]);
  const [allFormsCopy, setAllFormsCopy] = useState<IformattedCompilation[]>([]);
  const [allFormsChosen, setAllFormsChosen] = useState<IformattedCompilation[]>(
    []
  );
  const [years, setYears] = useState<string[]>([]);
  const [opendChart, setOpendChart] = useState(false);
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
    setAllFormsCopy([...formattedData]);
    setAllFormsChosen([...formattedData]);
  };

  const chartData = {
    labels: allFormsCopy.map((data) => data.month.name),
    datasets: [
      {
        label: "Ångest medelvärde",
        data: allFormsCopy.map((data) => data.averageValue),
        backgroundColor: [
          "#0F69BD",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false,
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1, // Stegstorleken för varje tick
        },
      },
    },
  };

  const OnClickChart = () => {
    setOpendChart(!opendChart);
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
        <YearDropDown years={years} formateData={formateData} />
        {allFormsChosen.length > 0 &&
          allFormsChosen[0] &&
          allFormsChosen[0].formData.length > 0 && (
            <div className="flex items-center">
              <h2 className="ml-5 text-xl font-medium mt-10">
                {allFormsChosen[0].formData[0].formdata?.date.split("-")[0]}
              </h2>
              <ButtonChart OnClickChart={OnClickChart} />
            </div>
          )}
        {opendChart && (
          <Chart
            setOpendChart={setOpendChart}
            chartData={chartData}
            options={options}
          />
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
