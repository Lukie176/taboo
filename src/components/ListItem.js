import db from '../Firebase';

// Only used for names in waiting room
export default function ListItem (props) {
  // Calculates other team number and sets this player to that new team
  function switchTeams() {
    let newTeam = (props.team % 2) + 1;
    db.ref('/games/' + props.gameid + '/players/' + props.name).set({category: newTeam});
  }

  return (
    <li onClick={switchTeams}>{props.name}</li>
  );
}