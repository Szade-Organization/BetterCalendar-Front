import CurrentTask from "./CurrentTask";

const YourWeek = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 bg-grey-background rounded-3xl min-w-full max-w-xl flex gap-4">
        <div className="w-1/2 flex flex-col">
          <CurrentTask />
        </div>
        <div className="w-1/2 flex flex-col">
          <CurrentTask />
        </div>
      </div>
    </div>
  );
};

export default YourWeek;
