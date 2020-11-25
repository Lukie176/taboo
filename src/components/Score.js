export default function Score(props) {
  return (
    <div className={(props.team === "1") ? "score team1" : "score team2"}>
      <div>
        <h4 style={(props.active) ? {textDecoration: "underline"}: {}}>Team {props.team}</h4> 
      </div>
      <h4>{props.score}</h4>
    </div>
  );
}
