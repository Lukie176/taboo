import React from 'react';
import db from '../Firebase';
import WaitingRoom from './WaitingRoom';
import { withRouter } from "react-router";

// Allows push to history in WaitingRoom component
const WaitingRoomWithRouter = withRouter(WaitingRoom);

export default class Name extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      valid: false,
      attempted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates name state with input field value
  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    // Prevent form from submitting HTTP request
    event.preventDefault();

    // Ensure name is at least 1 character long
    if (this.state.name.length > 0) {
      // Fetch all players thus far
      db.ref('/games/' + this.props.gameid + '/players').once('value', (snapshot) => {
        let snapObj = snapshot.val();
        let playerTeam = 1;

        // If name is unused, add it to the least populated team (default team1)
        // Checks if (1) no players have joined (2) name not already taken
        if (!(snapshot.exists()) || !(this.state.name in snapshot.val())) {
          if (!(snapshot.exists())) {
            // No players exist, so this player must be creator, add to team1
            db.ref('/games/' + this.props.gameid).update({creator: this.state.name});
          } else if (!(this.state.name in snapshot.val())) {
            // Names exist, but no duplicates; add to smallest team
            let teamsArray = Object.values(snapObj);
            let teamCount = [0, 0];
            teamsArray.forEach(playerTeam => teamCount[playerTeam.category - 1]++);
            playerTeam = ((teamCount[0] > teamCount[1]) ? 2 : 1);
          }

          // Add player to player list with designated team
          db.ref('/games/' + this.props.gameid + '/players/' + this.state.name).set({category: playerTeam});
          // Player has successfully joined a team, so render waiting room
          this.setState({valid: true});
        }
      });
    }
    
    // If name is not valid, DOM renders name conflict.
    this.setState({attempted: true});
  }

  render() {
    if (!this.state.valid) {
      return (
        <div className="content joinDiv">
          <form className="joinForm" onSubmit={this.handleSubmit}>
            <h1>Name</h1>
            {(this.state.attempted) ? <p>Please choose a different name.</p> : null}
            <input
              className="nameField"
              name="name"
              type="text" 
              minLength="1"
              autoComplete="off"
              value={this.state.name} 
              onChange={this.handleChange}
              autoFocus={true} />
            <br />
            <div className="footerButtons">
              <button type="submit" className="mainButton">Continue</button>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <WaitingRoomWithRouter gameid={this.props.gameid} name={this.state.name} />
      );
    }
  }
}