import CurrentTask from "./CurrentTask";

const YourWeek = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 bg-white rounded-3xl min-w-full max-w-xl flex">
        <CurrentTask />
      </div>
    </div>
  );
};

export default YourWeek;
