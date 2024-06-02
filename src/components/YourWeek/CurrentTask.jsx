import ProgressBar from "./ProgressBar";

const CurrentTask = ({ name, time, progress }) => {
  return (
    <div className="w-full p-2 lg:p-4 rounded-3xl bg-white shadow-lg">
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-start text-md lg:text-2xl font-extrabold text-black max-h-8">
          In progress
        </div>

        <div className="bg-violet-500 flex flex-col justify-around gap-4 p-5 rounded-3xl">
          {time !== "NaNd NaNh NaNm NaNs" && time !== "" && (
            <div>
              <ProgressBar progress={progress} />
              <div className="flex w-full justify-between text-white text-sm lg:text-xl">
                <div className="text-inherit font-extrabold ">{name}:</div>
                <div className="text-inherit font-extrabold ">{time}</div>
              </div>
            </div>
          )}
          {(time === "" || time === "NaNd NaNh NaNm NaNs") && (
            <div className="flex w-full justify-between text-white text-sm lg:text-xl font-extrabold">
              <p>No current task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentTask;
