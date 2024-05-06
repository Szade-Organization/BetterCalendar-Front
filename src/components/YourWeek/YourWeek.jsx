import CurrentTask from "./CurrentTask";
import UpcomingTasks from "./UpcomingTasks";
import AddTask from "./AddTask";
import ThisWeek from "./ThisWeek";

const YourWeek = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 bg-grey-background rounded-3xl min-w-full max-w-xl flex gap-4 h-[90%]">
        <div className="w-1/2 flex flex-col gap-4">
          <CurrentTask name="Studying" time="2:33" progress="45" />
          <UpcomingTasks />
        </div>
        <div className="w-1/2 flex flex-col gap-4">
          <AddTask />
          <ThisWeek />
        </div>
      </div>
    </div>
  );
};

export default YourWeek;
