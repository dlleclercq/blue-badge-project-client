import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(3),
      marginTop: theme.spacing(10),
      width: theme.spacing(50),
      height: theme.spacing(75),
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <img
          src="/assets/graph3-1.jpg"
          alt="bar graph"
          width="400px"
          height="600 px"
        />
      </Paper>

      <Paper elevation={0}>
        <img
          src="/assets/graph3-2.jpg"
          alt="bar graph"
          width="400px"
          height="600 px"
        />
      </Paper>

      <Paper elevation={0}>
        <img
          src="/assets/graph3-3.jpg"
          alt="bar graph"
          width="400px"
          height="600 px"
        />
      </Paper>
    </div>
  );
};

export default Landing;
