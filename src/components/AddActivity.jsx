import Modal from './Ui/Modals/Modal';
import ActivityForm from './Ui/Forms/ActivityForm';
import SearchForm from './Ui/Forms/Search';
import Button from './Ui/Buttons/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notification, { NotificationType } from './Ui/Notifications/Notification';

const AddActivity = () => {

    const notify = () => {
        toast(<Notification type={NotificationType.INFO}
            message='Info' />)
        toast(<Notification type={NotificationType.SUCCESS}
            message='Success!' />)
        toast(<Notification type={NotificationType.WARNING}
            message='Warning' />)
        toast(<Notification type={NotificationType.DANGER}
            message='Danger' />

        );
    }
    return (
        <div>
            <p>to dla testu </p>
            <SearchForm onSubmit={() => { }} />
            <Button className="bg-green-500 hover:bg-green-700" onClick={notify}>Notify!</Button>
            <ToastContainer />
            <br/>
            <Modal
                buttonText="Add Activity"
                content={(closeModal) => <ActivityForm onClose={closeModal} />}
            />
        </div>
    );
};

export default AddActivity;
