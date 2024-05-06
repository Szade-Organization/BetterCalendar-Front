import ThisWeekTask from "./ThisWeekTask";

const UpcomingTasks = () => {
  return (
    <div className="w-full p-10 rounded-3xl bg-white shadow-lg grow">
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-start text-3xl font-extrabold text-black max-h-8">
          This week
        </div>
        <div className="flex flex-col overflow-auto max-h-96">
          <ThisWeekTask toDo={10} done={3} name="Studying" color="purple" />
          <ThisWeekTask toDo={13} done={7} name="Ryan Gosling" color="red" />
          <ThisWeekTask toDo={10} done={9} name="Gardening" color="blue" />
        </div>
      </div>
    </div>
  );
};

export default UpcomingTasks;
