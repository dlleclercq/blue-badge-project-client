import "./App.css";
import ExpAdd from "./components/expenses/ExpAdd";
import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
import { PinDropSharp } from '@material-ui/icons';

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
      <Auth updateToken={updateToken} />
      <ExpAdd token={sessionToken} />      

    </div>
  );
}

export default App;
