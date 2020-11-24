import { Link } from "react-router-dom";

export default function Home() {
  return(
    <div className="newGameDiv">
      <h1>Taboo</h1>
      

      <div className="content joinDiv">
        <Link to="/new"><button type="submit" className="btn mainButton joinButton2">New Game</button></Link>
        <Link to="/join"><button type="submit" className="btn mainButton joinButton">Join Game</button></Link>
      </div>
    </div>
  )
}