import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Card, CardMedia, CardContent, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(3),
      marginTop: theme.spacing(10),
      width: theme.spacing(50),
      height: theme.spacing(60),
    },
  },
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card sx={{ width: 400, height: 570 }}>
        <CardMedia
          component="img"
          alt="landing page image"
          width=" 400"
          height="600"
          image="/assets/image03-1.jpg"
        />
      </Card>
      <Card sx={{ width: 400, height: 570 }}>
        <CardMedia
          component="img"
          alt="landing page image"
          width=" 400"
          height="600"
          image="/assets/image03-2.jpg"
        />
        <CardContent>
          <Paper>
            <div
              style={{
                position: "absolute",
                color: "#020202",
                backgroundColor: "#5E0035",
                border: "1px solid #5E0035",
                borderRadius: 10,
                top: 225,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0.93,
                padding: 10,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <h1>iSpend</h1>
              <h3>
                The best tools are ones you actually use. Keep track of your
                expenses with iSpend.
              </h3>
            </div>
          </Paper>
        </CardContent>
      </Card>

      <Card sx={{ width: 400, height: 570 }}>
        <CardMedia
          component="img"
          alt="landing page image"
          width=" 400"
          height="600"
          image="/assets/image03-3.jpg"
        />
      </Card>
    </div>
  );
};

export default Landing;
