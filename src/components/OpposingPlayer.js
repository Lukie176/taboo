import Card from './Card';
import Buzzer from './Buzzer';
import Timer from './Timer';
import Score from './Score';

export default function OpposingPlayer (props) {
  return (
    <div>
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
          <Buzzer game={props.gameid} />
        </div>
      </div>
    </div>
  );
}