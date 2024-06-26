import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface IChart {
  setOpendChart: (arg: boolean) => void;
  chartData: ChartDatasetProperties;
  options: Ioptions;
}
interface ChartDatasetProperties {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[];
}

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);
const Chart = ({ setOpendChart, chartData, options }: IChart) => {
  return (
    <div className="bg-[#F5F5F5] m-5 p-5 flex flex-col rounded" typeof="modal">
      <button
        className=" ml-auto p-3 bg-black rounded border border-gray hover:opacity-85 "
        onClick={() => {
          setOpendChart(false);
        }}
      >
        Stäng
      </button>
      <Line data={chartData} options={options} />;
    </div>
  );
};
export default Chart;
