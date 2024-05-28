import { useState, useEffect } from "react";
import { colors } from "../../consts/contsts";
import { useGetEventsByState } from "../../services/Queries";
import { Spinner } from "../Ui/Spinners/Spinner";
import { calculateRemainingTime } from "../../utils/utils";

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const UpcomingTasks = () => {
  const upcomingTasksQuery = useGetEventsByState("next", 3);
  const [tasksWithColors, setTasksWithColors] = useState([]);

  useEffect(() => {
    if (upcomingTasksQuery.isSuccess) {
      const upcomingTasks = upcomingTasksQuery.data.next;
      const tasksWithColors = upcomingTasks.map((task) => ({
        ...task,
        color: getRandomColor(),
        remainingTime: calculateRemainingTime(task.date_start),
      }));
      setTasksWithColors(tasksWithColors);

      const intervalId = setInterval(() => {
        setTasksWithColors((prevTasks) =>
          prevTasks.map((task) => ({
            ...task,
            remainingTime: calculateRemainingTime(task.date_start),
          }))
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [upcomingTasksQuery.isSuccess, upcomingTasksQuery.data]);

  if (upcomingTasksQuery.isLoading) {
    return <Spinner />;
  }

  return (
    <div className="w-full p-2 lg:p-4 rounded-3xl bg-white shadow-xl grow">
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-start text-md lg:text-2xl font-extrabold text-black max-h-8">
          Upcoming
        </div>
        {tasksWithColors &&
          tasksWithColors.map((task) => (
            <div key={task.id} className={`${task.color} flex p-4 rounded-3xl`}>
              <div className="flex w-full text-white">
                <div className="flex-grow text-inherit font-extrabold text-sm lg:text-xl text-start pl-2">
                  {task.name}:
                </div>
                <div className="text-inherit font-extrabold text-sm lg:text-xl">
                  {task.remainingTime}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
