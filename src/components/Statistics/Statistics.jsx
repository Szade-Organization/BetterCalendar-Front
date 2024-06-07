import CardStatistics from "./CardStatistics";
import Chart from "../Ui/Charts/Chart";
import { useEventsAndCategories } from "../../services/Queries";
import { Spinner } from "../Ui/Spinners/Spinner";
import { getEventsStatistics } from "../../utils/utils";


const Statistics = () => {
  const eventsQuery = useEventsAndCategories();

  if (eventsQuery.isLoading) {
    return <Spinner />
  }

  const { eventCount, totalDuration, avgEventDuration, completionPercentage, categoryCounts } = getEventsStatistics(eventsQuery.data);

  const donutData = {
    datasets: [
      {
        data: [completionPercentage, 100 - completionPercentage],
        backgroundColor: ["rgb(101, 241, 196)", "rgb(200, 200, 200)"],
        hoverOffset: 4,
      },
    ],
  };

  
  const pieData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Event Categories",
        data: Object.values(categoryCounts),
        backgroundColor: [
          "rgb(133, 105, 241)",
          "rgb(164, 101, 241)",
          "rgb(101, 143, 241)",
          "rgb(101, 241, 196)",
          "rgb(241, 196, 101)",
          "rgb(241, 101, 133)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="flex h-screen items-center">
      <div className="flex flex-col gap-8 justify-center p-5 bg-grey-background rounded-3xl w-full h-[90%]">
        <div className="flex flex-wrap">
          <CardStatistics
            icon="/assets/icons/activityicon.gif"
            number={eventCount}
            text="Total activities this month"
          />
          <CardStatistics
            icon="/assets/icons/timer.gif"
            number={totalDuration}
            text="Total time this month"
          />
          <CardStatistics
            icon="/assets/icons/timer.gif"
            number={avgEventDuration}
            text="Average activity time"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div className="shadow-lg rounded-lg bg-white p-4">
            <div className="flex flex-row">
              <div className="mb-5 text-2xl font-semibold text-gray-700">
                Completed Activites
              </div>
              <div className="mx-5 mb-5 text-2xl font-semibold text-green-700">
               {completionPercentage}%
              </div>
            </div>
            <Chart title={"Com"} type="doughnut" data={donutData} />
          </div>
          <div className="shadow-lg rounded-lg bg-white p-4">
            <div className="mb-5 text-2xl font-semibold text-gray-700">
              Category Breakdown
            </div>
            <div className="self-end">
              <Chart title={"Pie chart"} type="pie" data={pieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
