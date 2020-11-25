import Card from './Card.js';
import Button from './Button.js';
import Timer from './Timer.js';
import Score from './Score.js';
import db from '../Firebase';

export default function ActivePlayer (props) {
  function endRound() {
    db.ref('/games/' + props.gameid).update({review: true});
  }
  console.log(props);

  return (
    <div style={(props.buzzer) ? {backgroundColor: "#e0a800"} : {}}>
      <div className="oneButtonBody">
        <div className="content">
          <div className="header">
            <Score 
                   score={props.scores.team1} 
                   active={(props.active_team.category === 1) ? true : false} 
                   team="1" />
            <Timer />
            <Score 
                   score={props.scores.team2} 
                   active={(props.active_team.category === 2) ? true : false} 
                   team="2" />
          </div>
          <Card words={props.words} />
          <div className="buttonGroup">
            <Button text="danger" word={props.words.guess_word} game={props.gameid} team={props.active_team.category} />
            <Button text="success" word={props.words.guess_word} game={props.gameid} team={props.active_team.category} />
          </div>
        </div>
      </div>
      <button type="submit" className="btn mainButton" onClick={endRound}>End Round</button>
    </div>
  );
}