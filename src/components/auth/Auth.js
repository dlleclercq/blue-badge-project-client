import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Signup from "./Signup";
import Login from "./Login";
import Landing from "../landing/Landing";

const Auth = (props) => {
  return (
    <div>
      <Grid
        container
        direction="column"
        style={{ borderBottom: "1px solid #757780", padding: 10 }}
      >
        <Grid item container>
          <Grid item sm={1}>
            <img
              src="./assets/iSpendLogo.png"
              height="45"
              width="45"
              alt="iSpend Logo"
            />
          </Grid>
          <Grid item sm={9} />
          <Grid item sm={1}>
            <Signup updateToken={props.updateToken} />
          </Grid>
          <Grid item sm={1}>
            <Login updateToken={props.updateToken} />
          </Grid>
        </Grid>
      </Grid>
      <Landing />
    </div>
  );
};

export default Auth;
