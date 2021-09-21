import './App.css';
import ExpAdd from './components/expenses/ExpAdd';
import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
import ButtonAppBar from "./components/Navs/LandingNav";
import ButtonAppBarA from "./components/Navs/HomeNav";
import EnhancedTable from './components/ViewAll/ViewAll';

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
      <EnhancedTable />
    </div>
  );
}

export default App;
