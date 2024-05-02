import RadialProgressBar from "../Ui/Progress/RadialProgressBar";

const ThisWeekTask = ({ toDo, done, name, color }) => {
  const percentage = () => {
    return (Number(done) / Number(toDo)) * 100.0;
  };

  return (
    <div className="flex justify-around gap-4 rounded-3xl">
      <div className="flex w-full justify-start items-center">
        <RadialProgressBar percentage={percentage()} color={color} />
        <div className="text-inherit font-extrabold text-2xl flex flex-col items-start">
          <div>{name}</div>
          <div>
            {done}/{toDo}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThisWeekTask;
