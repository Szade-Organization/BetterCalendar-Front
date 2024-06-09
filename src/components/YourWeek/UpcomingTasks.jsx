import { useState, useEffect } from "react";
import { colors } from "../../consts/contsts";
import { useGetEventsByState } from "../../services/Queries";
import { Spinner } from "../Ui/Spinners/Spinner";
import { calculateRemainingTime } from "../../utils/utils";

const getRandomColor = (usedColors) => {
  const colorKeys = Object.keys(colors).filter(color => !usedColors.includes(color));
  if (colorKeys.length === 0) return null;  
  return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

const UpcomingTasks = () => {
  const upcomingTasksQuery = useGetEventsByState("next", 6);
  const [tasksWithColors, setTasksWithColors] = useState([]);

  useEffect(() => {
    if (upcomingTasksQuery.isSuccess) {
      const usedColors = [];
      const upcomingTasks = upcomingTasksQuery.data.next;
      const tasksWithColors = upcomingTasks.map((task) => {
        const color = getRandomColor(usedColors);
        if (color) usedColors.push(color); 
        return {
          ...task,
          color: color,
          remainingTime: calculateRemainingTime(task.date_start),
        };
      });
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
            <div key={task.id} className={`${colors[task.color] || 'bg-gray-200'} flex p-4 rounded-3xl`}>
              <div className="flex w-full text-black text-md lg:text-xl font-extrabold px-6">
                <div className="flex-grow text-inherit text-start">
                  {task.name}
                </div>
                <div className="text-inherit">
                  starts in: {task.remainingTime}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;
