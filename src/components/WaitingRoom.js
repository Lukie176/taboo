import React from "react";
import db from '../Firebase';
import TeamList from './TeamList';

export default class NewGame extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      players: null,
      attempted: false
    }

    this.startGame = this.startGame.bind(this);
  }

  componentDidMount() {
    this.teamRef = db.ref('/games/' + this.props.gameid + '/players/')
    this.teamListener = this.teamRef.on('value', (snapshot) => {
      this.setState({players: snapshot.val()});
    });

    db.ref('/games/' + this.props.gameid + '/creator').once('value', (snapshot) => this.setState({creator: snapshot.val()}));

    this.startRef = db.ref('/games/' + this.props.gameid + '/review')
    this.startListener = this.startRef.on('value', (snapshot) => {
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
    db.ref('/games/' + this.props.gameid + '/players/').once('value', (snapshot) => {
      let snapVals = Object.values(snapshot.val());
      let teamExists = [false, false];
      for (let i = 0; i < snapVals.length; i++) {
        teamExists[snapVals[i].category - 1] = true;
      }
      db.ref('/games/' + this.props.gameid).update({review: true, prev_player: {0: 0, 1: 0},  oneTeam: !(teamExists[0] && teamExists[1])});
    })
  }

  componentWillUnmount() {
    this.teamRef.off('value', this.teamListener);
  }

  render() {
    const startLink = ((this.props.name === this.state.creator) ? <button type="submit" className="mainButton" onClick={this.startGame}>Start Game</button> : null);
    let teamNotice = ((this.state.attempted) ? <span><br/>Each team must have at least one player</span> : null);

    return(
    <div className="newGameDiv">
      <div className="oneButtonBody">
        <h1>{this.props.gameid}</h1>
        <p>Use the Game Code above to join this lobby. {teamNotice}</p>
        <hr />
        <h2>Players</h2>
        <div className="players">
          <TeamList gameid={this.props.gameid} label={1} header="Team 1" data={this.state.players} toggle={true} />
          <TeamList gameid={this.props.gameid} label={2} header="Team 2" data={this.state.players} toggle={true} />
        </div>
      </div>
      <div className="footerButtons">
        {startLink}
      </div>
    </div>
  )
  }
  
}