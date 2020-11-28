export default function Card(props) {
  return (
    <div className="cardDiv">
      <h3 className="guessWord">{props.words.guess_word}</h3>
      <ul className="tabooWords">
        <li>{props.words.taboo_word1}</li>
        <li>{props.words.taboo_word2}</li>
        <li>{props.words.taboo_word3}</li>
        <li>{props.words.taboo_word4}</li>
        <li>{props.words.taboo_word5}</li>
      </ul>
    </div>
  );
}
