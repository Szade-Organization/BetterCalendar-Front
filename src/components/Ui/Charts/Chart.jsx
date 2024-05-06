import { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js/auto";

const Chart = ({ type, data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const configPie = {
      type: type,
      data: data,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ChartJS(chartRef.current, configPie);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data]);
  return (
    <div className="overflow-hidden">
      <canvas className="p-1" ref={chartRef}></canvas>
    </div>
  );
};

export default Chart;
