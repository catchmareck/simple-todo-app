import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import logo from './logo.svg';
import './App.scss';
import {Navbar, Auth, Taskslists, CreateTeam, TeamSettings} from "./components";

const App: React.FC = () => {
  return (
      <Router>
          <Navbar />

          <Switch>
              <Route path="/auth">
                  <Auth />
              </Route>
              <Route path="/tasklists">
                  <Taskslists />
              </Route>
              <Route path="/create-team">
                  <CreateTeam />
              </Route>
              <Route path="/team-settings">
                  <TeamSettings />
              </Route>
              <Route path="/">
                  <Auth />
              </Route>
          </Switch>
      </Router>
  );
};

export default App;
