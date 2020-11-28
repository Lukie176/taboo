import db from '../Firebase';

export default function Button(props) {
  function logResponse() {
    // Record whether word was correctly guessed
    db.ref('/games/' + props.game + '/results/' + props.word).set({category: (props.text === "success")});
    // Fetch number of words to randomly select next word
    db.ref('/word_count').once('value').then(snapshot => {
      // Randomly select an index in words array
      let wordChoice = Math.floor(Math.random() * (snapshot.val() + 1));

      // Fetch associated word object from Firebase
      db.ref('/words/' + wordChoice).once('value').then(snapshot => {
        // Update current words for this game
        db.ref('/games/' + props.game + '/words').set(snapshot.val());
      });
    });

    db.ref('/games/' + props.game + '/scores/team' + props.team).once('value').then(snapshot => {
      // Determine change in score depending on action
      let delta = ((props.text === "success") ? 1 : -1);

      // Update score in Firebase
      db.ref('/games/' + props.game + '/scores/team' + props.team).set(snapshot.val() + delta);
    });
  }
  
  return (
    <button className={"btn actions btn-" + props.text} onClick={logResponse}>
      <span className={"icon icon-" + props.text}></span>
    </button>
  );
}
