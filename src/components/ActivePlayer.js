import db from '../Firebase';
import Card from './Card';
import Button from './Button';
import Timer from './Timer';
import Score from './Score';

export default function ActivePlayer(props) {
  // Update DB with review game state
  function endRound() {
    db.ref('/games/' + props.gameid).update({review: true});
  }

  return (
    <div style={(props.buzzer) ? {backgroundColor: "white"} : {}}>
      <div className="content">
        <div className="header">
          <Score 
                 score={props.scores.team1} 
                 active={(props.active_team === 1) ? true : false} 
                 team="1" />
          <Timer />
          <Score 
                 score={props.scores.team2} 
                 active={(props.active_team === 2) ? true : false} 
                 team="2" />
        </div>
        <Card words={props.words} />
        <div className="buttonGroup">
          <Button text="danger" word={props.words.guess_word} game={props.gameid} team={props.active_team} />
          <Button text="success" word={props.words.guess_word} game={props.gameid} team={props.active_team} />
        </div>
      </div>
      <div className="footerButtons">
        <button type="submit" className="mainButton" onClick={endRound}>End Round</button>
      </div>
    </div>
  );
}