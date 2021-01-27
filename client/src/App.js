import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Homescreen from "./components/layout/Homescreen";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import TopPerformances from "./components/layout/performance/TopPerformances";
import Search from "./components/layout/shared/Search";
import CreatePerformance from "./components/layout/performance/CreatePerformance";
import CreateSong from "./components/layout/song/CreateSong";
import CreateArtist from "./components/layout/artist/CreateArtist";
import ArtistInfo from "./components/layout/artist/ArtistInfo";
import SongInfo from "./components/layout/song/SongInfo";
import PerformanceInfo from "./components/layout/performance/PerformanceInfo";
import ArtistList from "./components/layout/artist/ArtistList";
import Logout from "./components/auth/Logout";

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
              <Route exact path='/create-song' component={CreateSong} />
              <Route exact path='/create-artist' component={CreateArtist} />
              <Route exact path='/artists/:slug' component={ArtistInfo} />
              <Route
                exact
                path='/artists/:artist_slug/:slug'
                component={SongInfo}
              />
              <Route
                exact
                path='/performances/:id'
                component={PerformanceInfo}
              />
              <Route exact path='/artists/' component={ArtistList} />
              <Route exact path='/logout/' component={Logout} />
              <Redirect to='/' />
            </Switch>
          </section>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
