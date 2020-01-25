import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import './App.scss';
import {Navbar, Auth, Taskslists, CreateTeam, TeamSettings, UserSettings} from "./components";

const App: React.FC = () => {
  return (
      <Router>
          <Navbar />

          <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/tasklists" component={Taskslists} />
              <Route path="/create-team" component={CreateTeam} />
              <Route path="/team-settings" component={TeamSettings} />
              <Route path="/user-settings" component={UserSettings} />
              <Route path="/" component={Auth} />
          </Switch>
      </Router>
  );
};

export default App;
