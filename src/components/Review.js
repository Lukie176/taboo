import React from 'react';
import db from '../Firebase';
import TeamList from './TeamList';

// Class component so function executes only once
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
          // If no active_player, must be new game, so choose first player
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
            // Checks (1) next player not already chosen (2) player is after the last player's index
            if (nextOnTeam[playerTeam - 1] === null && i > this.props.prev_player[playerTeam - 1]) {
              nextOnTeam[playerTeam - 1] = i;
            }
          }
          // Next team should always change
          let nextTeam = (this.props.active_team % 2) + 1;
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

          // Set the next active team and the chosen player as prev_player
          toInsert["active_team"] = nextTeam;
          toInsert["prev_player/" + (snapObj[toInsert.active_player].category - 1)] = nextIndex;
        }
        // Insert changes into Firebase database
        db.ref('/games/' + this.props.gameid).update(toInsert);
      });
    }
  }

  // On round start, toggle review and reset guessed/discarded words
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

    // Link to start round only available for creator
    const startLink = ((this.props.name === this.props.creator) ? <button type="submit" className="mainButton" onClick={this.startRound}>Start Round</button> : null);

    return(
      <div>
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
          <TeamList gameid={this.props.gameid} label={true} header="Guessed" data={this.props.results} toggle={false} />
          <TeamList gameid={this.props.gameid} label={false} header="Discarded" data={this.props.results} toggle={false} />
        </div>
        <div className="footerButtons">
          {startLink}
        </div>
      </div>
    );
  }
}