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
                top: 190,
                left: "50%",
                transform: "translateX(-50%)",
                opacity: 0.93,
                padding: 10,
                fontWeight: "bold",
              }}
            >
              <h1 style={{ textAlign: "center" }}>iSpend</h1>
              <p>
                She must have hidden the plans in the escape pod. Send a
                detachment down to retrieve them, and see to it personally,
                Commander. There'll be no one to stop us this time! No! Alderaan
                is peaceful. We have no weapons. You can't possibly… Still,
                she's got a lot of spirit. I don't know, what do you think?
                Obi-Wan is here. The Force is with him. Partially, but it also
                obeys your commands. Alderaan? I'm not going to Alderaan. I've
                got to go home. It's late, I'm in for it as it is. Partially,
                but it also obeys your commands. What good is a reward if you
                ain't around to use it? Besides, attacking that battle station
                ain't my idea of courage. It's more like…suicide. Still, she's
                got a lot of spirit. I don't know, what do you think? Don't act
                so surprised, Your Highness. You weren't on any mercy mission
                this time. Several transmissions were beamed to this ship by
                Rebel spies. I want to know what happened to the plans they sent
                you. A tremor in the Force. The last time I felt it was in the
                presence of my old master. Your eyes can deceive you. Don't
                trust them. Hey, Luke! May the Force be with you. I need your
                help, Luke. She needs your help. I'm getting too old for this
                sort of thing. I want to come with you to Alderaan.
              </p>
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
