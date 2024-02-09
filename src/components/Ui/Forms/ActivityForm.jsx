import React from "react";
import DatePicker from "react-datepicker";
import { XCircle } from "feather-icons-react";

const ActivityForm = ({ onClose, newEvent, setNewEvent, handleAddEvent }) => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="absolute top-4 right-4">
          <XCircle onClick={onClose} className="hover:cursor-pointer" />
        </div>
        <h1 className="text-3xl font-bold my-8">New activity</h1>
        <div className="flex flex-col items-center flex-row mb-6 ">
          <div className="flex flex-col items-start mb-6">
            <label className="font-semibold text-lg mb-2">Title:</label>
            <input
              type="text"
              name="name"
              className="border border-black rounded p-2"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-start mb-6">
            <label className="font-semibold text-lg mb-2">Start:</label>
            <DatePicker
              placeholderText="Start Date"
              className="border border-black rounded p-2"
              selected={newEvent.start}
              onChange={(start) => setNewEvent({ ...newEvent, start })}
            />
          </div>

          <div className="flex flex-col items-start mb-6">
            <label className="font-semibold text-lg mb-2">End:</label>
            <DatePicker
              placeholderText="End Date"
              className="border border-black rounded p-2"
              selected={newEvent.end}
              onChange={(end) => setNewEvent({ ...newEvent, end })}
            />
          </div>
          <button
            onClick={() => {
              handleAddEvent();
              onClose();
            }}
            className="bg-green-500 hover:bg-green-700 p-2 rounded transition-colors mt-4"
          >
            Add event
          </button>
        </div>
      </div>
    </div>
  );
};
export default ActivityForm;
