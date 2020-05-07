import React from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Homescreen from "./components/layout/Homescreen";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Route exact path='/' component={Homescreen} />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
