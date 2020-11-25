import db from '../Firebase';
import React from 'react';
import TeamList from './TeamList';

export default class Review extends React.Component {
  constructor(props) {
    super(props);

    this.startRound = this.startRound.bind(this);
  }
  componentDidMount() {
    if (this.props.creator === this.props.name) {
      // Fetch number of words to randomly select next word
      db.ref('/word_count').once('value', (snapshot) => {
        // Randomly select an index in words array
        let wordChoice = Math.floor(Math.random() * (snapshot.val() + 1));

        // Fetch associated word object from Firebase
        db.ref('/words/' + wordChoice).once('value', (snapshot) => {
          // Update current words for this game
          db.ref('/games/' + this.props.gameid + '/words/').set(snapshot.val());
        });
      });

      // Choose next player
      db.ref('/games/' + this.props.gameid + '/players').once('value', (snapshot) => {
        let snapObj = snapshot.val();
        let snapKeys = Object.keys(snapObj);
        let toInsert = {active_player: snapKeys[0], active_team: snapObj[snapKeys[0]]};
        let thisOne = false;
        for (let i = 0; i < snapKeys.length; i++) {
          if (thisOne) {
            toInsert = {active_player: snapKeys[i], active_team: snapObj[snapKeys[i]]}
            break;
          } else if (snapKeys[i] === this.props.active_player) {
            thisOne = true;
          } 
        }
        db.ref('/games/' + this.props.gameid).update(toInsert);
      });
    }
  }

  startRound() {
    db.ref('/games/' + this.props.gameid).update({review: false, results: null});
  } 

  render() {
    // Determine role of player for next round
    let role;

    if (this.props.active_player === this.props.name) {
      role = "Clue Giver";
    } else if (this.props.active_team.category === this.props.team) {
      role = "Guesser";
    } else {
      role = "Watchdog";
    }

    const nextLink = ((this.props.name === this.props.creator) ? <button type="submit" className="btn mainButton" onClick={this.startRound}>Start Round</button> : null);

    return(
      <div>
        <div className="oneButtonBody">
          <div className="players">
            <h2 className="teamHeader">Team 1: {this.props.scores.team1}</h2>
            <h2 className="teamHeader">Team 2: {this.props.scores.team2}</h2>
          </div>
          <hr />
          <div className="reviewNext">
            <h4>Next: Team {this.props.active_team.category} - {this.props.active_player}</h4>
            <h4>You will be a {role}</h4>
          </div>
          <hr />
          <div className="players">
            <TeamList gameid={this.props.gameid} label={"guessed"} header="Guessed" data={this.props.results} toggle={false} />
            <TeamList gameid={this.props.gameid} label={"discarded"} header="Discarded" data={this.props.results} toggle={false} />
          </div>
        </div>
      {nextLink}
      </div>
    )
  }
}