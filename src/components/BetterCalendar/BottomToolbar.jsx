import { Navigate } from 'react-big-calendar';
import Button from "../Ui/Buttons/Button";

const BottomToolbar = ({ onNavigate, label }) => {

    return (

        <div className="flex space-x-2 justify-center">
            <Button className="bg-activities-background" onClick={() => onNavigate(Navigate.PREVIOUS)}>Previous</Button>

            <span className="text-l flex items-center">{label}</span>

            <Button className="bg-activities-background" onClick={() => onNavigate(Navigate.NEXT)}>Next</Button>

            <Button className="bg-planner-background" onClick={() => onNavigate(Navigate.TODAY)}>Today</Button>
        </div>

    );
};

export default BottomToolbar;
