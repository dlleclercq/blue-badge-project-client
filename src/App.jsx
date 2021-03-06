import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@material-ui/core";
import Auth from "./components/auth/Auth";
import HomeNav from "./components/Navs/HomeNav";

// import { PinDropSharp } from '@material-ui/icons';
import ExpenseTable from "./components/ViewAll/ViewAll";
import Landing from "./components/landing/Landing";
import ExpAdd from "./components/expenses/ExpAdd";
import Chart from "./components/chart/Chart";
import ExpSearch from "./components/expenses/ExpSearch";
// import Upcoming from "./components/upcoming/Upcoming";
import PageNotFound from "./components/PageNotFound";
import Upcoming from "./components/upcoming/Upcoming";

import ExpDel from "./components/expenses/ExpDel";

import ExpEdit from "./components/expenses/ExpEdit";

import "./App.css";

//teal = #6CCFF6
//purple = #5E0035
//Black = #020202
//Gray = #757780

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#020202",
    },
    secondary: {
      main: "#6ccff6",
    },
    info: {
      main: "#5E0035",
    },
    success: {
      main: "#757780",
    },
  },

  typography: {
    body1: { color: "#020202", fontWeight: "bold" },
  },

  overrides: {
    MuiDialog: {
      paper: {
        borderRadius: "0",
        border: "2px solid #020202",
      },
    },
    MuiSelect: {
      select: {
        color: "#020202",
      },
      icon: {
        color: "#020202",
      },
    },
    MuiInput: {
      underline: {
        color: "#020202",
      },
    },

    MuiTableRow: {
      color: "#6ccff6",
    },
  },
});

function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  // const clearToken = () => {
  //   localStorage.clear();
  //   setSessionToken("");
  // };

  return (
    <div>
      <Router>
        <ThemeProvider theme={customTheme}>
          <Switch>
            <Route exact path="/">
              <Auth updateToken={updateToken} />
            </Route>

            <Route exact path="/ExpAdd">
              {/* <ExpAdd token={sessionToken} /> */}
              <ExpenseTable token={sessionToken} />
              {/* <ExpEdit token={sessionToken} /> */}
              {/* <ExpSearch token={sessionToken} />
              <ExpDel token={sessionToken} /> */}
            </Route>
            <Route exact path="/HomeNav" component={HomeNav} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
