import React, { useState } from 'react';
import ActivityForm from './Forms/ActivityForm';
import Modal from './Modals/Modal';
import Notification, { NotificationType } from './Modals/Notification';
import SearchForm from './Forms/Search';

const AddActivity: React.FC = () => {


    return (
        <div>
            <SearchForm onSubmit={() => { }} />
            <Notification type={NotificationType.WARNING} message="Activity added successfully" onClose={() => { }} />
            <Modal
                buttonText="Add Activity"
                content={(closeModal) => <ActivityForm onClose={closeModal} />}
            />
        </div>
    );
};

export default AddActivity;
