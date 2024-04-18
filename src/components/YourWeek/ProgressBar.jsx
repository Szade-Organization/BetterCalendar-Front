import React from "react";

const styleForProgressBar = {
  width: "45%",
};

const ProgressBar = () => {
  return (
    <div className="bg-violet-800 flex flex-col justify-around gap-4 p-5 rounded-3xl">
      <div className="w-full bg-violet-900 rounded-full h-4 dark:bg-gray-700 ">
        <div
          className="bg-white h-4 rounded-full"
          style={styleForProgressBar}
        ></div>
      </div>
      <div className="flex w-full justify-between text-white">
        <div className="text-inherit font-extrabold text-2xl">Studying:</div>
        <div className="text-inherit font-extrabold text-2xl">2:33</div>
      </div>
    </div>
  );
};

export default ProgressBar;
