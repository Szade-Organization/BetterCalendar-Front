import CurrentTask from "./CurrentTask";
import UpcomingTasks from "./UpcomingTasks";
import AddTask from "./AddTask";

const YourWeek = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 bg-grey-background rounded-3xl min-w-full max-w-xl flex gap-4">
        <div className="w-1/2 flex flex-col gap-4">
          <CurrentTask />
          <UpcomingTasks />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <AddTask />
          <CurrentTask />
        </div>
      </div>
    </div>
  );
};

export default YourWeek;
