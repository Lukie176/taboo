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
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
  }

  // Updates joinCode state with input field value
  handleChange(event) {
    this.setState({joinCode: event.target.value.toUpperCase()});
  }

  // Validates join code and set state accordingly
  handleJoin(event) {
    db.ref('/games/' + this.state.joinCode).once('value', (snapshot) => {
      // Checks (1) game exists (2) joinCode length (3) game has not started
      if (snapshot.exists() && this.state.joinCode.length === 4 && (!("review" in snapshot.val()))) {
        this.setState({valid: true});
      } else if (this.state.joinCode.length > 0) {
        // If code is non-empty, indicate invalid code
        this.setState({attempt: true});
      }
      // Sets flag so a view renders
      this.setState({fetching: false});
    });

    // If join request came from form submission, prevent HTTP request
    if (event) {
      event.preventDefault();
    }
  }

  componentDidMount() {
    this.handleJoin();
  }

  componentDidUpdate(prevProps) {
    // Reset state if re-routed to JoinGame from Navigation
    // (1) Prevent change if from same location (2) Navbar link does not pass any params
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
    // Sends user to next stage if joinCode is valid
    if (this.state.valid) {
      return (<Name page="join" gameid={this.state.joinCode} />);
    // Otherwise if not checking code, render joinCode form
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
            <div className="footerButtons">
              <button type="submit" className="mainButton">Join Game</button>
            </div>
          </form>
        </div>
      );
    // Wait until initial code is checked to render anything
    } else {
      return (null);
    }
  }
}