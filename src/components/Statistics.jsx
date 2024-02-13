import activityicon from "../assets/activityicon.gif";
import timer from "../assets/timer.gif";
import CardStatistics from "./Statistics/CardStatistics";
import Chart from "./Ui/Charts/Chart";

const Statistics = () => {
  const data = {
    labels: ["Category 1", "Category 2", "Category 3"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const donutData = {
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["rgb(133, 105, 241)", "rgb(164, 101, 241)"],
        hoverOffset: 4,
      },
    ],
  };
  const configPie = {
    type: "pie",
    data: data,
    options: {},
  };

  const configDonut = {
    type: "doughnut",
    data: donutData,
    options: {},
  };

  return (
    <div className="p-5 bg-white rounded-3xl min-w-full">
      <div className="m-10 text-3xl font-semibold text-gray-700">
        Statistics
      </div>
      <div className="flex flex-wrap">
        <CardStatistics
          icon={activityicon}
          number={100}
          text="Total activities"
        />
        <CardStatistics icon={timer} number={168} text="Total time" />
        <CardStatistics number={100} text="Rest time" />
      </div>
      <div className="m-10 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
        <div>
          <div className="flex flex-row">
            <div className="mb-5 text-2xl font-semibold text-gray-700">
              Completed Activites
            </div>
            <div className="mx-5 mb-5 text-2xl font-semibold text-green-700">
              75%
            </div>
          </div>
          <Chart title={"Com"} type="doughnut" data={donutData} />
        </div>
        <div>
          <div className="mb-5 text-2xl font-semibold text-gray-700">
            Category Breakdown
          </div>
          <div className="self-end">
            <Chart title={"Pie chart"} type="pie" data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
