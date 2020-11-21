import Card from './components/Card.js'
import Button from './components/Button.js'
import Timer from './components/Timer.js'
import Score from './components/Score.js'
import NewCard from './components/NewCard.js'
import React from 'react';
import db from './Firebase';

import './App.css';

export default class App extends React.Component {
  constructor (props) {
    super(props);

    this.gameid = "TEST";

    // State stores current score to display
    this.state = {
      "active_team" : 1,
      "scores" : {
        "team1" : 0,
        "team2" : 0
      },
      "words" : {
        "guess_word" : " ",
        "taboo_word1" : " ",
        "taboo_word2" : " ",
        "taboo_word3" : " ",
        "taboo_word4" : " ",
        "taboo_word5" : " "
      }
    };
  }

  componentDidMount() {
    // Subscribes to the score of this team in this game
    let gameListener = db.ref('games/' + this.gameid);
    this.unsubscribe = gameListener.on('value', snapshot => {
      if (snapshot != null) {
        this.setState(snapshot.val())
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <div className="App">
      <main>
        <div className="header">
          <Score game={this.gameid} 
                 score={this.state.scores.team1} 
                 active={(this.state.active_team === 1) ? true : false} 
                 team="1" />
          <Timer />
          <Score game={this.gameid} 
                 score={this.state.scores.team2} 
                 active={(this.state.active_team === 2) ? true : false} 
                 team="2" />
        </div>
        <Card words={this.state.words} />
        <div className="buttonGroup">
          <Button text="wrong" game={this.gameid} team={this.state.active_team} />
          <Button text="pass" game={this.gameid} team={this.state.active_team} />
          <Button text="correct" game={this.gameid} team={this.state.active_team} />
        </div>
      </main>
      <NewCard />
    </div>
    );
  }
}