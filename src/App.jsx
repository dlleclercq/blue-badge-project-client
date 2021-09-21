import "./App.css";
import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
// import { PinDropSharp } from '@material-ui/icons';
import ExpSplash from "./components/expenses/ExpSplash";

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
      <Auth updateToken={updateToken} />     
      <ExpSplash token={sessionToken} />
    </div>
  );
}

export default App;
