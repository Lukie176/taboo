import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="newGameDiv">
      <h1>Taboo</h1>
      <p>Taboo is a verbal game played between two teams. Players take turns getting their team members to guess a given word without using the word itself or five other given taboo words.</p>     
      
      <div className="footerButtons">
        <Link to="/new"><button type="submit" className="mainButton">New Game</button></Link>
        <Link to="/join"><button type="submit" className="mainButton">Join Game</button></Link>
      </div>
    </div>
  );
}