import ProgressBar from "./ProgressBar";

const AddTask = () => {
  return (
    <div className="w-full px-10 py-6 rounded-3xl bg-white shadow-lg">
      <div className="flex justify-between gap-4 items-center w-full">
        <div className="flex flex-start text-4xl font-extrabold text-black max-h-8">
          New Activity
        </div>
        <div className="flex justify-center items-center text-white text-7xl font-extrabold rounded-full bg-gradient-to-r from-vivid-green via-sea-green to-war-blue w-20 h-20 ">
          +
        </div>
      </div>
    </div>
  );
};

export default AddTask;
