import React from "react";
import db from '../Firebase';
import { Link } from 'react-router-dom';

function makeGameId() {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   let charactersLength = characters.length;
   for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   console.log(result);
   return(result);
}

export default class NewGame extends React.Component {
  constructor (props) {
    super(props);
    let gameid = makeGameId();
    
    this.state = {
      gameid: gameid,
      team1: ["Luke", "Jasper", "Catherine", "Deborah"],
      team2: ["Quinn", "Piper", "Paisley", "Mark"],
      valid: false
    }
  }
  componentDidUpdate() {
    if (!this.state.valid) {
      db.ref('/games/' + this.state.gameid).once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.setState({gameid: makeGameId()});
        } else {
          this.setState({valid: true});
          // Fetch number of words to randomly select next word
          db.ref('/word_count').once('value').then(snapshot => {
            // Randomly select an index in words array
            let wordChoice = Math.floor(Math.random() * (snapshot.val() + 1));

            // Fetch associated word object from Firebase
            db.ref('/words/' + wordChoice).once('value').then(snapshot => {
              // Update current words for this game
              let initObj = {
                active_team: 1,
                scores: {team1: 0, team2: 0},
                words: snapshot.val()
              }

              db.ref('/games/' + this.state.gameid).set(initObj);
            })
          })
        }
      })
    }
  }

  componentDidMount() {
    this.teamRef = db.ref('/games/' + this.state.gameid + '/players/')
    this.teamListener = this.teamRef.on('value', (snapshot) => {
      this.setState(snapshot);
      console.log(this.state);
    });
  }

  componentWillUnmount() {
    this.teamRef.off('value', this.teamListener);
  }

  render() {

    const team1 = []

    for (let i = 0; i < this.state.team1.length; i++) {
      team1.push(<li key={"team1" + i}>{this.state.team1[i]}</li>)
    }

    const team2 = []

    for (let i = 0; i < this.state.team2.length; i++) {
      team2.push(<li key={"team2" + i}>{this.state.team2[i]}</li>)
    }
    return(
    <div className="newGameDiv">
      <h1>{this.state.gameid}</h1>
      <hr />
      <h2> Players</h2>
      <div className="players">
        <ul>
          <li className="teamHeader">Team 1</li>
          {team1}
        </ul>
        <ul>
          <li className="teamHeader">Team 2</li>
          {team2}
        </ul>
      </div>
      <div className="content joinDiv">
        <Link to={"/join/" + this.state.gameid}><button type="submit" className="btn mainButton joinButton">Start Game</button></Link>
      </div>
    </div>
  )
  }
  
}