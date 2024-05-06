const ProgressBar = ({ progress }) => {
  const styleForProgressBar = {
    width: `${progress}%`,
  };
  return (
    <div className="w-full bg-violet-900 rounded-full h-4 dark:bg-gray-700 ">
      <div
        className="bg-white h-4 rounded-full"
        style={styleForProgressBar}
      ></div>
    </div>
  );
};

export default ProgressBar;
