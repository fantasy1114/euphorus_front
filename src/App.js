import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { LoginContext } from "./Helper/Context";
import Home from "./pages/Home/Home";
import HomeAuthenticated from "./pages/HomeAuthenticated/HomeAuthenticated";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Navigation from "./components/Navbar/Navigation";
import Footer from "./components/Footer/Footer";
import "./App.css";
import ProtectedRoute from "./pages/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
          <Route path="/" exact component={Home}></Route>
          <ProtectedRoute
            path="/factors"
            component={HomeAuthenticated}
            isAuth={loggedIn}
          />
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
