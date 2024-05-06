const RadialProgressBar = ({ percentage, color }) => {
  const radius = 20;
  const PI = 3.14;
  const circleSize = 2 * PI * radius;
  const strokeWidth = 10;

  // rozmiar pierscienia jest odwrotnie proporcjonalny do tej wartosci
  const viewBoxSize = (radius * 2 + strokeWidth) * 2;

  return (
    <div className="relative w-40 h-40">
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      >
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="10"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="transparent"
        ></circle>
        <circle
          className={`text-${
            color || "purple"
          }-500 progress-ring__circle stroke-current`}
          strokeWidth="10"
          strokeLinecap="round"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="transparent"
          strokeDasharray={circleSize}
          strokeDashoffset={circleSize - (circleSize * percentage) / 100.0}
        ></circle>
      </svg>
    </div>
  );
};

export default RadialProgressBar;
