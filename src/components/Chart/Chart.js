import { React, useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import useCountryData from "../../api";
import axios from "axios";

function Chart() {
  const { loading, rowData, error } = useCountryData();

  let countryNames = [];
  let happinessScores = [];
  let backgroundColors = [
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
    "rgba(255, 99, 132, 0.6)",
  ];

  axios
    .get("http://131.181.190.87:3000/rankings?year=2020")
    .then((res) => res.data)
    .then((rankings) => {
      for (let i = 0; i < 15; i++) {
        countryNames.push(rankings[i].country);
        happinessScores.push(parseFloat(rankings[i].score));
      }
    });

  console.log("test");

  const [chartData, setChartData] = useState({
    chartData: {
      labels: countryNames,
      datasets: [
        {
          label: "Happiness Index",
          data: happinessScores,
          backgroundColor: backgroundColors,
        },
      ],
    },
  });

  return (
    <div className="chart container my-5">
      <HorizontalBar
        data={chartData.chartData}
        options={{
          responsive: true,
          title: { text: "Happiness Scores Per Country", display: true },
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
