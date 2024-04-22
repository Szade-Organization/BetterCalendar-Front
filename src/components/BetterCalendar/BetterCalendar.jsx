import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "../Ui/Modals/Modal";
import ActivityForm from "../Ui/Forms/ActivityForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CustomCalendar from "./CustomCalendar";
import {
  addActivity,
  deleteActivity,
  editActivity,
  fetchActivities,
} from "../../services/ActivityService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Toast, { ToastType } from "../Ui/Toast/Toast";
import { Spinner } from "../Ui/Spinners/Spinner";

const BetterCalendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const queryClient = useQueryClient();

  const eventsQuery = useQuery({
    queryKey: ["events"],
    queryFn: fetchActivities,
    onError: () => {
      toast(
        <Toast type={ToastType.ERROR} message="Couldn't load activities" />
      );
    },
  });

  const addEventMutation = useMutation(addActivity, {
    onMutate: async (newEvent) => {
      await queryClient.cancelQueries(["events"]);

      const previousEvents = queryClient.getQueryData(["events"]);
      queryClient.setQueryData(["events"], (old) => [...old, newEvent]);

      return { previousEvents };
    },
    onError: (err, newEvent, context) => {
      queryClient.setQueryData(["events"], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when adding activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const editEventMutation = useMutation(editActivity, {
    onMutate: async ({ id, activity }) => {
      await queryClient.cancelQueries(["events"]);

      const previousEvents = queryClient.getQueryData(["events"]);
      queryClient.setQueryData(["events"], (old) =>
        old.map((event) =>
          event.id === id ? { ...event, ...activity } : event
        )
      );

      return { previousEvents };
    },
    onError: (err, { id, activity }, context) => {
      queryClient.setQueryData(["events"], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when updating activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const deleteEventMutation = useMutation(deleteActivity, {
    onMutate: async (eventId) => {
      await queryClient.cancelQueries(["events"]);

      const previousEvents = queryClient.getQueryData(["events"]);
      queryClient.setQueryData(
        ["events"],
        previousEvents.filter((event) => event.id !== eventId)
      );

      return { previousEvents };
    },
    onError: (err, eventId, context) => {
      queryClient.setQueryData(["events"], context.previousEvents);
      toast(
        <Toast type={ToastType.ERROR} message="Error when deleting activity" />
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });

  const handleAddEvent = (newEvent) => {
    addEventMutation.mutate(newEvent);
  };

  const handleEditEvent = (eventId, updatedEvent) => {
    editEventMutation.mutate({ id: eventId, activity: updatedEvent });
  };

  const handleDeleteEvent = () => {
    deleteEventMutation.mutate(selectedEvent.id);
    setShowAddForm(false);
  };

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
