import ProgressBar from "./ProgressBar";

const CurrentTask = ({ name, time, progress }) => {
  return (
    <div className="w-full p-10 rounded-3xl bg-white shadow-lg">
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-start text-3xl font-extrabold text-black max-h-8">
          In progress
        </div>

        <div className="bg-violet-800 flex flex-col justify-around gap-4 p-5 rounded-3xl">
          <ProgressBar progress={progress} />
          <div className="flex w-full justify-between text-white">
            <div className="text-inherit font-extrabold text-2xl">{name}:</div>
            <div className="text-inherit font-extrabold text-2xl">{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
