import Button from "../Ui/Buttons/Button";

const CurrentTask = () => {
  return (
    <div className="min-w-1/2 p-5 rounded-3xl bg-week-background">
      <div className="flex space-between items-center">
        <div className="text-xl font-semibold text-black max-h-8">
          Current task
        </div>
        <Button className="bg-planner-background max-h-8">Add event</Button>
      </div>
    </div>
  );
};

export default CurrentTask;
