import React from 'react';
import db from '../Firebase';
import WaitingRoom from './WaitingRoom';
import { withRouter } from "react-router";

const WaitingRoomWithRouter = withRouter(WaitingRoom);

export default class Name extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      valid: false,
      attempted: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleSubmit(event) {
    // Prevent form from submitting HTTP request
    event.preventDefault();

    db.ref('/games/' + this.props.gameid + '/players').once('value', (snapshot) => {
      let snapObj = snapshot.val();

      let playerTeam = 1;

      // If name is unused, add it to the least populated team (default team1)
      if (!(snapshot.exists()) || !(this.state.name in snapshot.val())) {
        if (!(snapshot.exists())) {
          // No names exist, so must be creator, player to team1
          db.ref('/games/' + this.props.gameid).update({creator: this.state.name});
        } else if (!(this.state.name in snapshot.val())) {
          // Names exist, but no duplicates; add to smallest team
          let teamsArray = Object.values(snapObj);
          let teamCount = [0, 0]
          teamsArray.forEach(playerTeam => teamCount[playerTeam.category - 1]++)
          playerTeam = ((teamCount[0] > teamCount[1]) ? 2 : 1)
        }
        db.ref('/games/' + this.props.gameid + '/players/' + this.state.name).set({category: playerTeam});
        this.setState({team: playerTeam, valid: true});
      }
      
      // If name is not valid, DOM renders name conflict.
      this.setState({attempted: true});
    });
  }

  render() {
    if (!this.state.valid) {
      return (
        <div className="content joinDiv">
          <form className="joinForm" onSubmit={this.handleSubmit}>
            <div className="oneButtonBody">
            <h1>Name</h1>
            {(this.state.attempted) ? <p>Name already in use.</p> : null}
            <input
              className="nameField"
              name="name"
              type="text" 
              autoComplete="off"
              value={this.state.name} 
              onChange={this.handleChange}
              autoFocus={true} />
            <br />
            </div>
            <button type="submit" className="btn mainButton">Continue</button>
          </form>
        </div>);
    } else {
      return (
        <WaitingRoomWithRouter gameid={this.props.gameid} name={this.state.name} team={this.state.team} />
      )
    }
  }
}