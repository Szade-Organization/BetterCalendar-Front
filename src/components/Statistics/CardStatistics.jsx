import React from "react";

const CardStatistics = ({ icon, number, text }) => {
  return (
    <div className="w-full sm:w-1/2 lg:w-1/3 px-6 py-3">
      <div className="p-2 rounded-lg shadow-md flex flex-row items-center justify-start bg-white">
        <img src={icon} alt="" className="w-12 h-12" />
        <div className="mx-3">
          <div className="text-4xl font-semibold text-gray-800">{number}</div>
          <div className="text-md text-gray-600 mt-0.5">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default CardStatistics;
