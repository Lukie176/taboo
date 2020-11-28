import React from "react";
import db from '../Firebase';
import Name from './Name';

// Creates a codeLength-long capitalized character string
function makeGameCode(codeLength) {
   let result           = '';
   let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   let charactersLength = characters.length;
   for (let i = 0; i < codeLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return(result);
}

export default class NewGame extends React.Component {
  constructor (props) {
    super(props);
    
    this.state = {
      gameCode: makeGameCode(4),
      valid: false
    };

    this.checkGameCode = this.checkGameCode.bind(this);
  }

  // Component updates every state update, so will continue checking until valid
  componentDidUpdate() {
    this.checkGameCode();
  }

  // Checks Game Code on initial mount
  componentDidMount() {
    this.checkGameCode();
  }

  checkGameCode() {
    // If Game Code is not yet confirmed as available
    if (!this.state.valid) {
      db.ref('/games/' + this.state.gameCode).once('value', (snapshot) => {
        if (snapshot.exists()) {
          // If values already exist, game code must already be in use
          this.setState({gameCode: makeGameCode(4)});
        } else {
          // If it doesn't yet exist, insert into DB and indicate valid game code 
          db.ref('/games/' + this.state.gameCode).set({
            scores: {team1: 0, team2: 0}
          });
          
          this.setState({valid: true});
        }
      });
    }
  }

  render() {
    if (this.state.valid) {
      return(
        <Name creator={true} gameid={this.state.gameCode} />
      );
    } else {
      return (null);
    }
  }
}