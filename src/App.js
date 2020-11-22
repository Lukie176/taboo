import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from "./components/Navigation"
import Home from "./components/Home"
import NewGame from "./components/NewGame"
import JoinGame from "./components/JoinGame"
import About from "./components/About"
import NewCard from "./components/NewCard"

import './App.css';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <main>
          <Switch>
            <Route path={["/join/:joinCode", "/join"]} component={JoinGame} />
            <Route path="/about">
              <About />
            </Route>
            <Route path="/newcard">
              <NewCard />
            </Route>
            <Route path="/new">
              <NewGame />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}