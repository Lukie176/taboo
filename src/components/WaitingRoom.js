import React from "react";
import db from '../Firebase';
import TeamList from './TeamList';

export default class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      players: null
    };

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    // Listens to array of players in lobby
    this.teamRef = db.ref('/games/' + this.props.gameid + '/players/');
    this.teamListener = this.teamRef.on('value', (snapshot) => {
      // If player joins or changes team, update state
      this.setState({players: snapshot.val()});
    });

    // Fetches creator's name once 
    db.ref('/games/' + this.props.gameid + '/creator').once('value', (snapshot) => {
      this.setState({creator: snapshot.val()});
    });

    // Listens to review to detect start of game
    this.startRef = db.ref('/games/' + this.props.gameid + '/review');
    this.startListener = this.startRef.on('value', (snapshot) => {
      // If review exists, game started, push play link to history/URL
      if (snapshot.exists()) {
        this.props.history.push({
          pathname: '/play',
          state: {
            name: this.props.name,
            team: this.state.players[this.props.name].category,
            gameid: this.props.gameid
          }
        });
      }
    });
  }

  startGame() {
    // Checks if all players are on the same team
    let snapVals = Object.values(this.state.players);
    let teamExists = [false, false];
    for (let i = 0; i < snapVals.length; i++) {
      teamExists[snapVals[i].category - 1] = true;
    }
    // Starts game, sets most recently played player, and whether all players are on the same team
    db.ref('/games/' + this.props.gameid).update({review: true, prev_player: {0: 0, 1: 0},  oneTeam: !(teamExists[0] && teamExists[1])});
  }

  componentWillUnmount() {
    // Unsubscribes to two subscriptions initiated on mount
    this.teamRef.off('value', this.teamListener);
    this.startRef.off('value', this.startListener);
  }

  render() {
    // Only the creator may start the game
    const startLink = ((this.props.name === this.state.creator) ? <button type="submit" className="mainButton" onClick={this.startGame}>Start Game</button> : null);

    return (
      <div className="newGameDiv">
        <h1>{this.props.gameid}</h1>
        <p>Use the Game Code above or go to <code>lukesorensen.dev/join/{this.props.gameid}/</code> to join this lobby.</p>
        <hr />
        <h2>Players</h2>
        <div className="players">
          <TeamList gameid={this.props.gameid} label={1} header="Team 1" data={this.state.players} toggle={true} />
          <TeamList gameid={this.props.gameid} label={2} header="Team 2" data={this.state.players} toggle={true} />
        </div>
        <div className="footerButtons">
          {startLink}
        </div>
      </div>
    );
  }
}