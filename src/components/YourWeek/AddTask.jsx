import { useAddActivityModal } from "../../context/AddActivityModalContext";

const AddTask = () => {
  const { setShowAddActivityModal } = useAddActivityModal();
  return (
    <div className="w-full px-10 py-6 rounded-3xl bg-white shadow-lg">
      <div className="flex justify-between gap-4 items-center w-full">
        <div className="flex flex-start text-xl lg:text-4xl font-extrabold text-black">
          New Activity
        </div>
        <button onClick={() => setShowAddActivityModal(true)}>
          <div className="flex justify-center items-center text-white text-4xl lg:text-7xl font-extrabold rounded-full bg-gradient-to-r from-vivid-green via-sea-green to-war-blue w-16 h-14 lg:w-28 lg:h-20 ">
            +
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddTask;
