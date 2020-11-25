import db from '../Firebase';

export default function ListItem (props) {
  // gameid={this.props.gameid} label={1} header="Team 1" data={this.state.players} toggle={true}
  function switchTeams() {
    let newTeam = (props.team % 2) + 1;
    db.ref('/games/' + props.gameid + '/players/' + props.name).set({category: newTeam});
  }

  return (
    <li onClick={switchTeams}>{props.name}</li>
    );
}