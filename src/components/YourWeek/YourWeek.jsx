import { useState, useEffect } from "react";
import CurrentTask from "./CurrentTask";
import UpcomingTasks from "./UpcomingTasks";
import AddTask from "./AddTask";
import ThisWeek from "./ThisWeek";
import { Spinner } from "../Ui/Spinners/Spinner";
import { useGetEventsByState } from "../../services/Queries";
import { calculateProgress, calculateRemainingTime } from "../../utils/utils";

const YourWeek = () => {
  const currentTaskQuery = useGetEventsByState("current", 1);
  const [remainingTime, setRemainingTime] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentTaskQuery.isSuccess) {
      const currentTask = currentTaskQuery?.data?.current[0];

      const updateRemainingTimeAndProgress = () => {
        setRemainingTime(calculateRemainingTime(currentTask?.date_end));
        setProgress(
          calculateProgress(currentTask?.date_start, currentTask?.date_end)
        );
      };

      updateRemainingTimeAndProgress();
      const intervalId = setInterval(updateRemainingTimeAndProgress, 1000);

      return () => clearInterval(intervalId);
    }
  }, [currentTaskQuery.isSuccess, currentTaskQuery.data]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 p-4 bg-grey-background rounded-3xl min-w-full max-w-xl h-[90%]">
        <div className="flex flex-row h-1/4 gap-4">
          {currentTaskQuery.isLoading ? (
            <Spinner />
          ) : (
            <CurrentTask
              name={currentTaskQuery?.data?.current[0]?.name}
              time={remainingTime}
              progress={progress}
            />
          )}

          <AddTask />
        </div>
        <div className="flex flex-row h-full gap-4">
          <UpcomingTasks />
        </div>
      </div>
    </div>
  );
};

export default YourWeek;
