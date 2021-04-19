import { Component, React, useState } from "react";
import { HorizontalBar } from "react-chartjs-2";

// class Chart extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       chartData: {
//             labels: [
//             "Finland",
//             "Denmark",
//             "Switzerland",
//             "Iceland",
//             "Norway",
//             "Netherlands",
//             ],
//             datasets: [
//             {
//                 label: "Happiness Index",
//                 data: [7.809, 7.646, 7.56, 7.504, 7.488, 7.449],
//                 backgroundColor: [
//                 "rgba(255, 99, 132, 0.6)",
//                 "rgba(54, 162, 235, 0.6)",
//                 "rgba(255, 206, 86, 0.6)",
//                 "rgba(75, 192, 192, 0.6)",
//                 "rgba(153, 102, 255, 0.6)",
//                 "rgba(255, 159, 64, 0.6)",
//                 "rgba(255, 99, 132, 0.6)",
//                 ],
//             },
//             ],
//       },
//     };
//   }
//   //   const [chartData, setChartData] = useState({
//   //     chartData: {
//   //       labels: [
//   //         "Boston",
//   //         "Worcester",
//   //         "Springfield",
//   //         "Lowell",
//   //         "Cambridge",
//   //         "New Bedford",
//   //       ],
//   //       datasets: [
//   //         {
//   //           label: "Population",
//   //           data: [617594, 181045, 153060, 106519, 105162, 95072],
//   //           backgroundColor: [
//   //             "rgba(255, 99, 132, 0.6)",
//   //             "rgba(54, 162, 235, 0.6)",
//   //             "rgba(255, 206, 86, 0.6)",
//   //             "rgba(75, 192, 192, 0.6)",
//   //             "rgba(153, 102, 255, 0.6)",
//   //             "rgba(255, 159, 64, 0.6)",
//   //             "rgba(255, 99, 132, 0.6)",
//   //           ],
//   //         },
//   //       ],
//   //     },
//   //   });
//   render() {
//     return (
//       <div className="chart container my-5">
//         <HorizontalBar data={this.state.chartData} options={{}} />
//       </div>
//     );
//   }
// }

function Chart() {
  const [chartData, setChartData] = useState({
    chartData: {
      labels: [
        "Finland",
        "Denmark",
        "Switzerland",
        "Iceland",
        "Norway",
        "Netherlands",
      ],
      datasets: [
        {
          label: "Happiness Index",
          data: [7.809, 7.646, 7.56, 7.504, 7.488, 7.449],
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
        },
      ],
    },
  });

  return (
    <div className="chart container my-5">
      <HorizontalBar data={chartData.chartData} options={{}} />
    </div>
  );
}

export default Chart;
