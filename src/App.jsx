import "./App.css";
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@material-ui/core";
import Auth from "./components/auth/Auth";
// import { PinDropSharp } from '@material-ui/icons';
import ExpSplash from "./components/expenses/ExpSplash";
import ButtonAppBar from "./components/Navs/LandingNav";
import ButtonAppBarA from "./components/Navs/HomeNav";
import EnhancedTable from './components/ViewAll/ViewAll';
import Landing from "./components/landing/Landing";
import ExpAdd from "./components/expenses/ExpAdd";
import Chart from "./components/chart/Chart";
// import Upcoming from "./components/upcoming/Upcoming";
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
    h1: { color: "#6CCFF6", fontWeight: "bold" },
    h2: { color: "#6CCFF6", fontWeight: "bold" },
    h3: { color: "#6CCFF6", fontWeight: "bold" },
    h4: { color: "#6CCFF6", fontWeight: "bold" },
    h5: { color: "#6CCFF6", fontWeight: "bold" },
    h6: { color: "#6CCFF6", fontWeight: "bold" },
    body1: { color: "#6CCFF6" },
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
        color: "#6CCFF6",
      },
      icon: {
        color: "#6ccff6",
      },
    },
    MuiInputBase: {
      formControl: {
        underline: {
          color: "#6ccff6",
        },
      },
    },
    MuiInput: {
      underline: {
        color: "#6ccff6",
      },
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

  return (    
    <div>      
      <ThemeProvider theme={customTheme}>
        <ExpSplash token={sessionToken} />
        <Auth updateToken={updateToken} />
        <Landing />
        <ExpAdd token={sessionToken} />
        <Chart />
        {/* <Upcoming /> */}
      </ThemeProvider>
    </div>
  );
}

export default App;
