import React from 'react';
import db from '../Firebase';
import Card from './Card.js'
import Button from './Button.js'
import Timer from './Timer.js'
import Score from './Score.js'

export default class Play extends React.Component {
  constructor (props) {
    super(props);

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
    this.gameRef = db.ref('games/' + this.props.gameid);
    this.gameListener = this.gameRef.on('value', snapshot => {
      if (snapshot.exists()) {
        this.setState(snapshot.val())
      }
    });
  }

  componentWillUnmount() {
    this.gameRef.off('value', this.gameListener);
  }

  render() {
    return (
      <div className="content">
        <div className="header">
          <Score game={this.props.gameid} 
                 score={this.state.scores.team1} 
                 active={(this.state.active_team === 1) ? true : false} 
                 team="1" />
          <Timer />
          <Score game={this.props.gameid} 
                 score={this.state.scores.team2} 
                 active={(this.state.active_team === 2) ? true : false} 
                 team="2" />
        </div>
        <Card words={this.state.words} />
        <div className="buttonGroup">
          <Button text="danger" game={this.props.gameid} team={this.state.active_team} />
          <Button text="warning" game={this.props.gameid} team={this.state.active_team} />
          <Button text="success" game={this.props.gameid} team={this.state.active_team} />
        </div>
      </div>
    );
  }
}