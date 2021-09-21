import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";

const Upcoming = (props) => {
  return (
    <Card>
      <CardHeader title="Upcoming Expenses" />
      <Typography variant="H=h5">$50</Typography>
      <Pie data="DATA" />
    </Card>
  );
};

export default Upcoming;
