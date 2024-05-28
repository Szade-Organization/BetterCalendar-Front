import { createContext, useContext, useState } from 'react';
import Modal from '../components/Ui/Modals/Modal';
import ActivityForm from '../components/Ui/Forms/ActivityForm';
import { useUserContext } from './AuthContext';
import { useAddEventMutation, useCategoriesQuery } from '../services/Queries';
import { Spinner } from '../components/Ui/Spinners/Spinner';

const AddActivityModalContext = createContext();

export const AddActivityModalProvider = ({ children }) => {
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const { user } = useUserContext();
  const categoriesQuery = useCategoriesQuery();
  const addEventMutation = useAddEventMutation(user.id);


  const handleAddEvent = (newEvent) => {
    addEventMutation.mutate(newEvent, {
      onSuccess: () => {
        setShowAddActivityModal(false);
      },
    });
  };

  return (
    <AddActivityModalContext.Provider value={{ showAddActivityModal, setShowAddActivityModal }}>
      {children}
      {showAddActivityModal && (
        <Modal
          content={
            categoriesQuery.isLoading ? (
              <Spinner />
            ) : (
              <ActivityForm
                onClose={() => setShowAddActivityModal(false)}
                title={"New activity"}
                handleAddEvent={handleAddEvent}
                categories={categoriesQuery.data}
              />
            )
          }
          className="w-[75%] lg:w-1/2"
        />
      )}
    </AddActivityModalContext.Provider>
  );
};

export const useAddActivityModal = () => useContext(AddActivityModalContext);
