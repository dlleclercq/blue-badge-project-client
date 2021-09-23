import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const Chart = () => {
  const [data, setData] = useState("");
  return (
    <div>
      <Paper
        style={{
          position: "absolute",
          backgroundColor: "#020202",
          height: 600,
        }}
      >
        <Pie
          data={{
            labels: [
              "Restaurant",
              "Food",
              "Electric",
              "Gas",
              "Water",
              "Childcare",
              "Health",
              "Beauty",
              "Other",
            ],
            datasets: [
              {
                label: "Totals",
                data: [11, 11, 11, 11, 11, 11, 11, 11, 12],
                options: {
                  animation: true,
                  // responsive: true,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                      text: "Our Chart",
                    },
                  },
                },
                borderColor: ["#020202"],

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
                radius: 100,
              },
            ],
          }}
        />
      </Paper>
    </div>
  );
};

export default Chart;
