import React from 'react';
import db from '../Firebase';
import Play from './Play'

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
    const target = event.target ;
    const value = target.value;
    const name = target.name;
    
    this.setState({
      [name]: value.toUpperCase()
    });
  }

  handleJoin(event) {
    this.props.history.push('/join/' + this.state.joinCode);
    db.ref('/games/' + this.state.joinCode).once('value', (snapshot) => {
      if (snapshot.exists() && this.state.joinCode.length === 4) {
        this.setState({valid: true, attempt: false});
      } else if (this.state.joinCode.length > 0) {
        this.setState({attempt: true});
      }
      this.setState({fetching: false});
    });

    if (event)
      event.preventDefault();
  }

  componentDidUpdate(prevProps) {
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
    if (!this.state.fetching && this.state.valid) {
      return (<Play gameid={this.state.joinCode} />);
    } else if (!this.state.fetching) {
      return (
        <div className="content joinDiv">
          <form className="joinForm" onSubmit={this.handleJoin}>
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
              onChange={this.handleChange}/>
            <br />
            <button type="submit" className="btn mainButton joinButton">Join Game</button>
          </form>
        </div>
      );
    } else {
      return null
    }
    
  }
}