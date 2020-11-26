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
        let toInsert = {};
        if (this.props.active_player === "") {
          toInsert["active_player"] = snapKeys[0];
          toInsert["active_team"] = snapObj[snapKeys[0]].category;
        } else {
          let firstOnTeam = [null, null];
          let nextOnTeam = [null, null];
          for (let i = 0; i < snapKeys.length; i++) {
            let playerTeam = snapObj[snapKeys[i]].category;

            // First players on each team
            if (firstOnTeam[playerTeam - 1] === null) {
              firstOnTeam[playerTeam - 1] = i;
            }
            // Next player on each team
            if (nextOnTeam[playerTeam - 1] === null && i > this.props.prev_player[playerTeam - 1]) {
              nextOnTeam[playerTeam - 1] = i;
            }
          }
          let nextTeam = (this.props.active_team % 2) + 1

          let nextIndex;
          if (nextOnTeam[nextTeam - 1] !== null) {
            // If next player on next team exists, assign accordingly
            toInsert["active_player"] = snapKeys[nextOnTeam[nextTeam - 1]];
            nextIndex = nextOnTeam[nextTeam - 1];
          } else if (firstOnTeam[nextTeam - 1] !== null) {
            // If players exist on next team, assign first player
            toInsert["active_player"] = snapKeys[firstOnTeam[nextTeam - 1]];
            nextIndex = firstOnTeam[nextTeam - 1];
          } else if (nextOnTeam[this.props.active_team - 1] !== null) {
            // All players on one team, assign next player on current team
            toInsert["active_player"] = snapKeys[nextOnTeam[this.props.active_team - 1]];
            nextIndex = nextOnTeam[this.props.active_team - 1];
          } else {
            // Assign first player on the only team
            toInsert["active_player"] = snapKeys[firstOnTeam[this.props.active_team - 1]];
            nextIndex = firstOnTeam[this.props.active_team - 1];
          }
          toInsert["active_team"] = (this.props.active_team % 2) + 1;
          toInsert["prev_player/" + (snapObj[toInsert.active_player].category - 1)] = nextIndex;
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
    } else if (this.props.active_team === this.props.team || this.props.oneTeam) {
      role = "Guesser";
    } else {
      role = "Watchdog";
    }

    const nextLink = ((this.props.name === this.props.creator) ? <button type="submit" className="mainButton" onClick={this.startRound}>Start Round</button> : null);

    return(
      <div>
        <div className="oneButtonBody">
          <div className="players">
            <h2 className="teamHeader">Team 1<br/>{this.props.scores.team1}</h2>
            <h2 className="teamHeader">Team 2<br/>{this.props.scores.team2}</h2>
          </div>
          <hr />
          <div className="reviewNext">
            <h4>Next: Team {this.props.active_team} - {this.props.active_player}</h4>
            <h4>You will be a {role}</h4>
          </div>
          <hr />
          <div className="players">
            <TeamList gameid={this.props.gameid} label={"guessed"} header="Guessed" data={this.props.results} toggle={false} />
            <TeamList gameid={this.props.gameid} label={"discarded"} header="Discarded" data={this.props.results} toggle={false} />
          </div>
        </div>
        <div className="footerButtons">
        {nextLink}
        </div>
      </div>
    )
  }
}