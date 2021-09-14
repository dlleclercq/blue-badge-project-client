import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Signup from "./Signup";
import Login from "./Login";

const Auth = (props) => {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid item sm={10} />
        <Grid item sm={1}>
          <Signup updateToken={props.updateToken} />
        </Grid>
        <Grid item sm={1}>
          <Login updateToken={props.updateToken} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Auth;
