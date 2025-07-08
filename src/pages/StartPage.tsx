import classes from "../styles/StartPage.module.css";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  function handleStartGame() {
    navigate("/game_page");
  }

  return (
    <>
      <div className={`${classes["startpage-main-container"]}`}>
        <h1>Start Page</h1>
        <button onClick={handleStartGame}>Start Game</button>
      </div>
    </>
  );
}

export { StartPage };
