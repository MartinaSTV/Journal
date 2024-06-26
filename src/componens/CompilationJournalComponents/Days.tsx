import { useState } from "react";
import ButtonChart from "./ButtonChart";
import Chart from "./Chart";

interface IDays {
  chosenMonth: IformattedCompilation;
}

const Days = ({ chosenMonth }: IDays) => {
  const [opendChart, setOpendChart] = useState(false);

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
    <article className="ml-5 bg-[#F5F5F5] pt-5">
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
          <h2 className="pl-5">{days.date}</h2>
          <section className="flex flex-col pl-5">
            {days.formsDay.map((form, idx) => (
              <button key={idx + "daysBtn"} className="w-[300px]">
                {form.formdata.title} visa mer
              </button>
            ))}
          </section>
        </div>
      ))}
    </article>
  );
};
export default Days;
