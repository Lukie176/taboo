import React from 'react';
import db from '../Firebase';
import Name from './Name';

export default class JoinGame extends React.Component {
  constructor(props) {
    super(props);

    let joinCode = (("joinCode" in props.match.params) ? props.match.params.joinCode : "").toUpperCase();

    this.state = {
      fetching: true,
      attempt: false,
      valid: false,
      joinCode: joinCode
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  componentDidMount() {
    this.handleJoin();
  }

  handleChange(event) {
    this.setState({
      joinCode: event.target.value.toUpperCase()
    });
  }

  handleJoin(event) {
    db.ref('/games/' + this.state.joinCode).once('value', (snapshot) => {
      if (snapshot.exists() && this.state.joinCode.length === 4 && (!("review" in snapshot.val()))) {
        this.setState({valid: true});
      } else if (this.state.joinCode.length > 0) {
        this.setState({attempt: true});
      }
      this.setState({fetching: false});
    });

    if (event)
      event.preventDefault();
  }

  componentDidUpdate(prevProps) {
    // Reset state if re-routed to JoinGame from Navigation
    if (this.props.location !== prevProps.location && !("joinCode" in this.props.match.params)) {
      let joinCode = (("joinCode" in this.props.match.params) ? this.props.match.params.joinCode : "");
      this.setState({
        attempt: false,
        valid: false,
        joinCode: joinCode
      });
    }
  }

  render() {
    let attempted = ((this.state.attempt) ? <p>This Game Code is Invalid</p> : null);
    if (this.state.valid) {
      return (<Name page="join" gameid={this.state.joinCode} />);
    } else if (!this.state.fetching) {
      return (
        <div className="content joinDiv">
          <form className="joinForm" onSubmit={this.handleJoin}>
            <div className="oneButtonBody">
              <h1>Game Code</h1>
              {attempted}
              <input
                className="joinField"
                maxLength="4"
                id="joinCode"
                name="joinCode"
                type="text" 
                autoComplete="off"
                value={this.state.joinCode} 
                onChange={this.handleChange}
                autoFocus={true} />
              <br />
            </div>
            <button type="submit" className="btn mainButton">Join Game</button>
          </form>
        </div>
      );
    } else {
      return null
    }
    
  }
}