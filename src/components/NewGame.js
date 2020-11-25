import React from "react";
import db from '../Firebase';
import Name from './Name';

function makeGameId() {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   let charactersLength = characters.length;
   for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return(result);
}

export default class NewGame extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      gameid: makeGameId(),
      valid: false
    }

    this.checkGameId = this.checkGameId.bind(this);
  }

  componentDidUpdate() {
    this.checkGameId();
  }

  componentDidMount() {
    this.checkGameId();
  }

  checkGameId() {
    if (!this.state.valid) {
      db.ref('/games/' + this.state.gameid).once('value', (snapshot) => {
        if (snapshot.exists()) {
          this.setState({gameid: makeGameId()});
        } else {
          this.setState({valid: true});
          let initObj = {
            active_team: 1,
            scores: {team1: 0, team2: 0}
          };

          db.ref('/games/' + this.state.gameid).set(initObj);
        }
      })
    }
  }

  render() {
    if (this.state.valid) {
      return(
        <Name creator={true} gameid={this.state.gameid} />
      )
    } else {
      return (null)
    }
  }
}