import React from 'react';
import db from '../Firebase';

export default function Score(props) {
  function switchTeams() {
    db.ref('games/' + props.game + '/active_team').set(parseInt(props.team));
  }

  return (
    <div className={(props.team === "1") ? "score team1" : "score team2"} onClick={switchTeams}>
      <div>
        <h4 style={(props.active) ? {textDecoration: "underline"}: {}}>Team {props.team}</h4> 
      </div>
      <h4>{props.score}</h4>
    </div>
  );
}
