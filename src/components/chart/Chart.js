import React from "react";
import { Pie } from "react-chartjs-2";

const Chart = () => {
  return (
    <div>
      <Pie
        data={{
          labels: [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange",
            "Turqouise",
            "Pink",
            "Violet",
          ],
          datasets: [
            {
              label: "Totals",
              data: [12, 40, 85, 36, 21, 77, 92, 76, 39],
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: "right",
                  },
                  title: {
                    display: true,
                    text: "Our Chart",
                  },
                },
              },
              backgroundColor: [
                "rgba(157, 2, 8)",
                "rgba(0, 0, 188)",
                "rgba(252, 243, 0)",
                "rgba(0, 128, 0)",
                "rgba(153, 102, 255)",
                "rgba(255, 159, 64)",
                "rgba(0, 180, 216)",
                "rgba(255, 175, 204)",
                "rgba(60, 9, 108)",
              ],
              radius: 400,
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
