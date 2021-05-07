import { React, useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";

function Chart(props) {
  const [chartData, setChartData] = useState({});

  const backgroundColors = [
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
    "rgba(75, 192, 192, 0.6)",
    "rgba(153, 102, 255, 0.6)",
    "rgba(255, 159, 64, 0.6)",
    "rgba(255, 99, 132, 0.6)",
    "rgba(54, 162, 235, 0.6)",
    "rgba(255, 206, 86, 0.6)",
  ];

  useEffect(() => {
    setChartData({
      chartData: {
        labels: props.yAxis,
        datasets: [
          {
            label: props.category,
            data: props.xAxis,
            backgroundColor: backgroundColors,
          },
        ],
      },
    });
  }, [props.countryNames, props.scores, props.category, backgroundColors]);

  return (
    <div className="chart container my-5">
      <HorizontalBar
        data={chartData.chartData}
        options={{
          responsive: true,
          title: {
            text: `${props.category} Scores ${props.label}`,
            display: true,
          },
          scales: {
            xAxes: [
              {
                maxBarThickness: 100,
              },
            ],
          },
        }}
      />
    </div>
  );
}

export default Chart;
