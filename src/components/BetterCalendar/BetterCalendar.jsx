import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Ui/Modals/Modal";
import ActivityForm from "../Ui/Forms/ActivityForm";
import { API_URL } from "../../constants";

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

const BetterCalendar = () => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  }

  useEffect(() => {
    fetch(`${API_URL}/activity/`)
      .then((response) => response.json())
      .then((events) => {
        setAllEvents(events);
      });
  }, []);

  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);

  return (
    <div className="p-5 bg-white rounded-3xl">
      <Modal
        buttonText="Add Activity"
        content={(closeModal) => (
          <ActivityForm
            onClose={closeModal}
            newEvent={newEvent}
            setNewEvent={setNewEvent}
            handleAddEvent={handleAddEvent}
          />
        )}
      />
      <Calendar
        localizer={localizer}
        events={allEvents}
        titleAccessor="name"
        startAccessor="date_start"
        endAccessor="date_end"
        style={{ height: 500, margin: 50 }}
      />
    </div>
  );
};

export default BetterCalendar;
