import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import HomeAuthenticated from "./pages/HomeAuthenticated/HomeAuthenticated";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navigation from "./components/Navbar/Navigation";
import Footer from "./components/Footer/Footer";
import "./App.css";

export const ThemeContext = React.createContext();

function App() {
  const [messageVisible, setMessageVisible] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  return (
    <>
      <ThemeContext.Provider value={messageVisible}>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/factors" component={HomeAuthenticated}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
          </Switch>
          <Footer />
        </Router>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
