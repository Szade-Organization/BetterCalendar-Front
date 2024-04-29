const RadialProgressBar = ({ percentage }) => {
  const radius = 20;
  const PI = 3.14;
  const circleSize = 2 * PI * radius;
  const strokeWidth = 10;

  // rozmiar pierscienia jest odwrotnie proporcjonalny do tej wartosci
  const viewBoxSize = (radius * 2 + strokeWidth) * 2;

  return (
    <div class="relative w-40 h-40">
      <svg class="w-full h-full" viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <circle
          class="text-gray-200 stroke-current"
          stroke-width="10"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="transparent"
        ></circle>
        <circle
          class="text-indigo-500 progress-ring__circle stroke-current"
          stroke-width="10"
          stroke-linecap="round"
          cx={viewBoxSize / 2}
          cy={viewBoxSize / 2}
          r={radius}
          fill="transparent"
          stroke-dasharray={circleSize}
          stroke-dashoffset={circleSize - (circleSize * percentage) / 100.0}
        ></circle>

        <text
          x={viewBoxSize / 2}
          y={viewBoxSize / 2}
          font-family="Verdana"
          font-size="12"
          text-anchor="middle"
          dominant-baseline="middle"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default RadialProgressBar;
