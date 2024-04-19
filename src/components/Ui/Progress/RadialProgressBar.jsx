const RadialProgressBar = ({ percentage }) => {
  return (
    <div class="relative w-40 h-40">
      <svg class="w-full h-full" viewBox="0 0 100 100">
        <circle
          class="text-gray-200 stroke-current"
          stroke-width="10"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
        ></circle>
        <circle
          class="text-indigo-500  progress-ring__circle stroke-current"
          stroke-width="10"
          stroke-linecap="round"
          cx="50"
          cy="50"
          r="40"
          fill="transparent"
          stroke-dasharray="251.2"
          stroke-dashoffset={251.2 - (251.2 * { percentage }) / 100}
        ></circle>

        <text
          x="50"
          y="50"
          font-family="Verdana"
          font-size="12"
          text-anchor="middle"
          alignment-baseline="middle"
        >
          70%
        </text>
      </svg>
    </div>
  );
};

export default RadialProgressBar;
