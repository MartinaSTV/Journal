import { useState } from "react";
import ButtonChart from "./ButtonChart";
import Chart from "./Chart";
import AnswearsInday from "./AnswearsInDay";

interface IDays {
  chosenMonth: IformattedCompilation;
}
interface ISetStateDay {
  opend: boolean;
  data: null | IresponseForm;
  idx: null | number;
  dayIndex: null | number;
}

const Days = ({ chosenMonth }: IDays) => {
  const [opendChart, setOpendChart] = useState(false);
  const [showAnswersDay, setShowAnswersDay] = useState<ISetStateDay>({
    opend: false,
    data: null,
    idx: null,
    dayIndex: null,
  });

  const chartData = {
    labels: chosenMonth.days.map((data) => data.date),
    datasets: [
      {
        label: "Ångest medelvärde",
        data: chosenMonth.days.map((data) => data.avergeValueDay),
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
          stepSize: 1,
        },
      },
    },
  };

  const OnClickChart = () => {
    setOpendChart(!opendChart);
  };

  return (
    <article className="ml-5 bg-[#F5F5F5] pt-5 max-w-[1500px] mr-5 mb-5">
      <ButtonChart OnClickChart={OnClickChart} />
      {opendChart && (
        <Chart
          setOpendChart={setOpendChart}
          chartData={chartData}
          options={options}
        />
      )}
      {chosenMonth.days.map((days, idx) => (
        <div key={idx + "days"} className="text-black">
          <h2 className="pl-5 font-medium ">{days.date}</h2>
          <section className="flex flex-col pl-5 mb-10">
            {days.formsDay.map((form, index) => (
              <div key={index + "daysB"}>
                <button
                  onClick={() => {
                    setShowAnswersDay({
                      opend: !showAnswersDay.opend,
                      data: form,
                      idx: index,
                      dayIndex: idx,
                    });
                  }}
                  className={`flex w-[full] items-center border rounded mr-5 h-[40px] mt-5 ${
                    index % 2 === 0 ? "bg-[#F5F5F5]" : "bg:white"
                  }`}
                >
                  <p className="ml-5">{form.formdata.title}</p>
                  <p className="ml-auto mr-5 ">visa mer</p>
                </button>
                {showAnswersDay.idx === index &&
                  showAnswersDay.opend &&
                  showAnswersDay.dayIndex === idx && (
                    <AnswearsInday data={form} />
                  )}
              </div>
            ))}
          </section>
        </div>
      ))}
    </article>
  );
};
export default Days;
