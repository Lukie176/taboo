import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import NewGame from "./components/NewGame";
import JoinGame from "./components/JoinGame";
import NewCard from "./components/NewCard";
import Play from "./components/Play";

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <main>
          <Switch>
            <Route path={["/join/:joinCode", "/join"]} component={JoinGame} />
            <Route path="/new" component={NewGame} />
            <Route path="/play" component={Play} />
            <Route path="/newcard" component={NewCard} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </Router>
    </div>
  );
}