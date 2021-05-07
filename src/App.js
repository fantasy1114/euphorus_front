import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContext } from "./Helper/Context";
import Rankings from "./pages/Rankings";
import Factors from "./pages/Factors";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CountryDetails from "./pages/CountryDetails";
import Navigation from "./components/Navbar/Navigation";
import Footer from "./components/Footer/Footer";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import ServerError from "./pages/ServerError";

function App() {
  const token = localStorage.getItem("token");
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if (token !== "" && token !== undefined && token !== null) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [token]);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/" exact component={Rankings}></Route>
          <ProtectedRoute
            path="/factors"
            component={Factors}
            isAuth={loggedIn}
          />
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/503error" component={ServerError}></Route>
          <Route path="/details" component={CountryDetails}></Route>
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
