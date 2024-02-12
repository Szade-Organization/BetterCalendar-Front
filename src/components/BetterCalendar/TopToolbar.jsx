import { useContext } from "react";
import Button from "../Ui/Buttons/Button";
import { ToolbarContext } from "./CustomCalendar";

const TopToolbar = ({ onView }) => {
  const { setShowAddForm } = useContext(ToolbarContext);
  return (
    <div className="flex flex-col mb-3">
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-3">
          <Button className="bg-blue-400" onClick={() => onView('month')}>Month</Button>
          <Button className="bg-blue-400" onClick={() => onView('week')}>Week</Button>
          <Button className="bg-blue-400" onClick={() => onView('day')}>Day</Button>
        </div>
        <Button className="bg-planner-background" onClick={() => setShowAddForm(true)}>
          Add event
        </Button>
      </div>
    </div>
  );
};

export default TopToolbar;
