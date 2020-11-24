import React from 'react';
import { useParams } from 'react-router-dom';
import db from '../Firebase';
import Play from "./Play";

export default function GameCheck(props) {
  let { joinCode } = props.match.params;
  console.log(joinCode)
  let valid = true;
  db.ref('/games/' + joinCode).once('value').then((snapshot) => {
    if (!snapshot.exists()) {
      valid = false;
    }
  });
  console.log(joinCode);

  const redirectTag = ((!valid) ? '<Redirect to="/join">' : null)

  return (
    <div>
      <Play gameid={joinCode} />
      { redirectTag }
    </div>
  )
}