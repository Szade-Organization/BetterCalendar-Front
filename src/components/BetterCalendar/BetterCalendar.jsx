import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Ui/Modals/Modal";
import ActivityForm from "../Ui/Forms/ActivityForm";
import CustomCalendar from "./CustomCalendar";
import { Spinner } from "../Ui/Spinners/Spinner";
import { useUserContext } from "../../context/AuthContext";
import { useAddEventMutation, useDeleteEventMutation, useEditEventMutation, useEventsAndCategories} from "../../services/Queries";

const BetterCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false); 
  const { user } = useUserContext(); 

  const eventsQuery = useEventsAndCategories(user.id);
  const addEventMutation = useAddEventMutation(user.id);
  const editEventMutation = useEditEventMutation(user.id);
  const deleteEventMutation = useDeleteEventMutation(user.id);  
  
  
  const handleAddEvent = (newEvent) => {
    addEventMutation.mutate(newEvent);
  };

  const handleEditEvent = (eventId, updatedEvent) => {
    editEventMutation.mutate({ id: eventId, activity: updatedEvent });
  };

  const handleDeleteEvent = () => {
    deleteEventMutation.mutate(selectedEvent.id);
    setShowAddForm(false);
  }

  const handleEventSelect = (event) => {
    setSelectedEvent(event);    
    setShowDetails(true);
  
  };

  if (eventsQuery.isLoading) {
    return <Spinner />;
  }

 
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-5 bg-white rounded-3xl w-full">
        {showAddForm && (
          <Modal
            content={
              <ActivityForm
                onClose={() => setShowAddForm(false)}
                title={"New activity"}
                handleAddEvent={handleAddEvent}
                categories={eventsQuery.categories}
              />
            }
            className="w-[90%] lg:w-3/4"
          />

        )}
        <CustomCalendar
          events={eventsQuery.data}
          titleAccessor="name"
          startAccessor="date_start"
          endAccessor="date_end"
          allDayAccessor="allDay"
          style={{ height: 600, margin: 20 }}
          className="overflow-auto"
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
                handleEditEvent={handleEditEvent}
                isEditing={true}
                handleDeleteEvent={handleDeleteEvent}
                categories={eventsQuery.categories}
              />
            }
            className="w-[90%] lg:w-3/4"
          />
        )}
      </div>
    </div>
  );
};

export default BetterCalendar;
