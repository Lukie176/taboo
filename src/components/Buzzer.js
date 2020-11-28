import db from '../Firebase';

export default function Button(props) {
  // Function to turn buzzer off
  function restoreBuzzer() {
    db.ref('/games/' + props.game).update({buzzer: false});
  }

  // Turn buzzer on, wait 3 seconds, then turn it off
  function logResponse() {
    db.ref('/games/' + props.game).update({buzzer: true});
    setTimeout(restoreBuzzer, 3000);
  }

  return (
    <button className="btn btn-danger buzzer" onClick={logResponse}>
      <span className="icon icon-danger"></span>
    </button>
  );
}
