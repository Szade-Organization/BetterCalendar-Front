import SearchForm from "./Ui/Forms/Search";
import Button from "./Ui/Buttons/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification, {
  NotificationType,
} from "./Ui/Notifications/Notification";

const AddActivity = () => {
  const notify = () => {
    toast(<Notification type={NotificationType.INFO} message="Info" />, {
      position: "bottom-right",
    });
    toast(<Notification type={NotificationType.SUCCESS} message="Success!" />, {
      position: "bottom-right",
    });
    toast(<Notification type={NotificationType.WARNING} message="Warning" />, {
      position: "bottom-right",
    });
    toast(<Notification type={NotificationType.DANGER} message="Danger" />, {
      position: "bottom-right",
    });
  };

  return (
    <div className="flex justify-center flex-col">
      <p>to dla testu </p>

      <SearchForm onSubmit={() => {}} />
      <Button className="bg-green-500 hover:bg-green-700" onClick={notify}>
        Notify!
      </Button>
      <br />
    </div>
  );
};

export default AddActivity;
