import { React, useState, useEffect } from "react";
import { HorizontalBar } from "react-chartjs-2";
import axios from "axios";

function Chart(props) {
  // let countryNames = [];
  // let happinessScores = [];

  const [chartData, setChartData] = useState({});

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

  // axios
  //   .get(`http://131.181.190.87:3000/rankings?year=${props.year}`)
  //   .then((res) => res.data)
  //   .then((rankings) => {
  //     for (let i = 0; i < 15; i++) {
  //       countryNames.push(rankings[i].country);
  //       happinessScores.push(parseFloat(rankings[i].score));
  //     }
  //   });

  // console.log("New Data:");
  // console.log(rowData);

  // if (rowData.length > 0) {
  //   for (let i = 0; i < 15; i++) {
  //     countryNames.push(rowData[i].country);
  //     happinessScores.push(parseFloat(rowData[i].score));
  //   }
  // }

  // const [chartData, setChartData] = useState({
  //   chartData: {
  //     labels: props.countryNames,
  //     datasets: [
  //       {
  //         label: "Happiness Index",
  //         data: props.scores,
  //         backgroundColor: backgroundColors,
  //       },
  //     ],
  //   },
  // });

  useEffect(() => {
    setChartData({
      chartData: {
        labels: props.countryNames,
        datasets: [
          {
            label: "Happiness Index",
            data: props.scores,
            backgroundColor: backgroundColors,
          },
        ],
      },
    });
  }, []);

  // function updateChartData() {
  //   setChartData({
  //     chartData: {
  //       labels: countryNames,
  //       datasets: [
  //         {
  //           label: "Happiness Index",
  //           data: happinessScores,
  //           backgroundColor: backgroundColors,
  //         },
  //       ],
  //     },
  //   });
  // }

  // useEffect(() => {
  //   setChartData({
  //     chartData: {
  //       labels: countryNames,
  //       datasets: [
  //         {
  //           label: "Happiness Index",
  //           data: happinessScores,
  //           backgroundColor: backgroundColors,
  //         },
  //       ],
  //     },
  //   });
  // });

  return (
    <div className="chart container my-5">
      <HorizontalBar
        data={chartData.chartData}
        options={{
          responsive: true,
          title: {
            text: `Top 15 Happiness Scores ${props.year}`,
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
