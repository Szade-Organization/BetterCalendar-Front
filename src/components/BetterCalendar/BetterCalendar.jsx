import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../Ui/Inputs/Input";
import Button from "../Ui/Buttons/Button";
import { FaRegCalendarAlt } from "react-icons/fa";
import Modal from "../Ui/Modals/Modal";
import ActivityForm from "../Ui/Forms/ActivityForm";

const locales = {
  "en-Us": "en-Us",
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big meeting",
    start: new Date(2023, 11, 5),
    end: new Date(2023, 11, 5),
  },
  {
    title: "Small meeting",
    start: new Date(2023, 11, 6),
    end: new Date(2023, 11, 6),
  },
  {
    title: "Medium meeting",
    start: new Date(2024, 1, 6), // 1 is February 
    end: new Date(2024, 1, 6),
  },
];

const BetterCalendar = () => {

  const [allEvents, setAllEvents] = useState(events);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAddEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  }
  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    console.log(event);
    setShowDetails(true);
  }


  return (
    <div className="p-5 bg-white rounded-3xl">
      <div className="flex justify-end mr-9">
        <Button className="bg-lime-400" onClick={() => setShowAddForm(true)}>
          Add event
        </Button>
      </div>
      {showAddForm &&
        <Modal
          content={<ActivityForm
            onClose={() => setShowAddForm(false)}
            title={"New activity"}
            handleAddEvent={handleAddEvent} />}

        />
      }
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: 30 }}
        onSelectEvent={handleEventSelect}
      />
      {showDetails && (
        <Modal
          content={<ActivityForm
            onClose={() => setShowDetails(false)}
            values={selectedEvent}
            title={"Edit activity"}
            handleAddEvent={handleAddEvent}
          />}
        />
      )}
    </div>
  );
};

export default BetterCalendar;
