import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Homescreen from "./components/layout/Homescreen";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import TopPerformances from "./components/layout/performance/TopPerformances";
import Search from "./components/layout/Search";
import CreatePerformance from "./components/layout/performance/CreatePerformance";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div>
          <Navbar />
          <section className='container'>
            <Route exact path='/' component={Homescreen} />
            <Switch>
              <Route exact path='/top' component={TopPerformances} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/search' component={Search} />
              <Route
                exact
                path='/create-performance'
                component={CreatePerformance}
              />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
