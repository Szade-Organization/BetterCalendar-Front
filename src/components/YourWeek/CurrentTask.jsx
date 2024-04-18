import ProgressBar from "./ProgressBar";

const CurrentTask = () => {
  return (
    <div className="w-full p-10 rounded-3xl bg-white shadow-lg">
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-start text-3xl font-extrabold text-black max-h-8">
          In progress
        </div>
        <ProgressBar />
      </div>
    </div>
  );
};

export default CurrentTask;
