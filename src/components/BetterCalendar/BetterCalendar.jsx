import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Ui/Buttons/Button";
import Modal from "../Ui/Modals/Modal";
import ActivityForm from "../Ui/Forms/ActivityForm";

const API_URL = import.meta.env.VITE_API_URL;


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

  const [allEvents, setAllEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const convertEventDates = (event) => ({
    ...event,
    date_start: new Date(event.date_start),
    date_end: new Date(event.date_end),
  });
  
  const handleAddEvent = (newEvent) => {
    const eventWithDates = convertEventDates(newEvent);
    setAllEvents([...allEvents, eventWithDates]);
  };
  
  const handleEditEvent = (eventId, updatedEvent) => {
    setAllEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventId ? { ...event, ...convertEventDates(updatedEvent) } : event
      )
    );
  };

  const handleEventSelect = (event) => {
    setSelectedEvent(event);
    console.log(event);
    setShowDetails(true);
  }
  useEffect(() => {
    fetch(`${API_URL}/activity/`)
      .then((response) => response.json())
      .then((fetchedEvents) => {
        const formattedEvents = fetchedEvents.map((event) => ({
          ...event,
          date_start: new Date(event.date_start),
          date_end: new Date(event.date_end),
        }));
        setAllEvents(formattedEvents);
      });
  }, []);

  useEffect(() => {
    console.log(allEvents);
  }, [allEvents]);

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
            handleAddEvent={handleAddEvent}
          />}
        />
      }
      <Calendar
        localizer={localizer}
        events={allEvents}
        titleAccessor="name"
        startAccessor="date_start"
        endAccessor="date_end"
        style={{ height: 500, margin: 30 }}
        onSelectEvent={handleEventSelect}
      />
      {showDetails && (
        <Modal
          content={
            <ActivityForm
              onClose={() => setShowDetails(false)}
              title={"Edit activity"}
              values={selectedEvent}
              handleAddEvent={handleAddEvent}
              handleEditEvent={handleEditEvent}
              isEditing={true}
            />}
        />
      )}
    </div>
  );
};

export default BetterCalendar;
