import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Ui/Modals/Modal";
import ActivityForm from "../Ui/Forms/ActivityForm";

import CustomCalendar from "./CustomCalendar";

const API_URL = import.meta.env.VITE_API_URL;




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
    <div className="p-3 bg-white rounded-3xl">
      <div className="flex justify-end mr-9">
      
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
      <CustomCalendar    
        events={allEvents}
        titleAccessor="name"
        startAccessor="date_start"
        endAccessor="date_end"
        style={{ width: 600, height: 600, margin: 20 }}     
        setShowAddForm={setShowAddForm}
        handleEventSelect={handleEventSelect}      
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
