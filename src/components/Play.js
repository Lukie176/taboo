import React from 'react';
import db from '../Firebase';
import Review from './Review';
import ActivePlayer from './ActivePlayer';
import GuessingPlayer from './GuessingPlayer';
import OpposingPlayer from './OpposingPlayer';

export default class Play extends React.Component {
  constructor (props) {
    super(props);

    if (props.location.state == null) {
      this.props.history.push('/');
    }

    // State stores current score to display
    this.state = {
      fetching: true,
      name: this.props.location.state.name,
      gameid: this.props.location.state.gameid,
      team: this.props.location.state.team,
      oneTeam: true,
      review: true,
      active_player: ""
    };
  }

  componentDidMount() {
    // Subscribes to the score of this team in this game
    this.gameRef = db.ref('/games/' + this.state.gameid);
    this.gameListener = this.gameRef.on('value', snapshot => {
      this.setState(snapshot.val());
      this.setState({fetching: false});
    });
  }

  componentWillUnmount() {
    this.gameRef.off('value', this.gameListener);
  }

  render() {
    if (this.state.fetching) {
      return null
    } else if (this.state.review) {
      return (<Review {...this.state} />)
    } else if (this.state.active_player === this.state.name) {
      return (<ActivePlayer {...this.state} />)
    } else if (this.state.active_team === this.state.team || this.state.oneTeam) {
      return (<GuessingPlayer {...this.state} />)
    } else {
      return (<OpposingPlayer {...this.state} />)
    }
  }
}