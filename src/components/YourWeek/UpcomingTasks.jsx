const UpcomingTasks = () => {
  return (
    <div className="w-full p-10 rounded-3xl bg-white shadow-lg">
      <div className="flex justify-between flex-col gap-4">
        <div className="flex flex-start text-3xl font-extrabold text-black max-h-8">
          Upcoming
        </div>
        <div className="bg-red-500 flex flex-col justify-around gap-4 p-5 rounded-3xl">
          <div className="flex w-full justify-between text-white">
            <div className="text-inherit font-extrabold text-2xl w-48">
              Ryan Gosling Marathon:
            </div>
            <div className="text-inherit font-extrabold text-2xl">2:33</div>
          </div>
        </div>
        <div className="bg-green-500 flex flex-col justify-around gap-4 p-5 rounded-3xl">
          <div className="flex w-full justify-between text-white">
            <div className="text-inherit font-extrabold text-2xl">
              Studying:
            </div>
            <div className="text-inherit font-extrabold text-2xl">2:33</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTasks;
