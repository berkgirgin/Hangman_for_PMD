import classes from "../styles/HangmanDrawing.module.css";
import { useHangmanContext } from "../context/HangmanProvider";
import { EnergyBar } from "./EnergyBar";

function HangmanDrawing() {
  const hangman = useHangmanContext();

  const playedTurnsCount = hangman.numberOfTurns.allTurns;
  const wrongGuessesCount = hangman.numberOfTurns.failedTurns;

  if (wrongGuessesCount > 10) {
    throw new Error("energybar animation would not want more than 10 guesses");
  }

  return (
    <>
      <div className={`${classes["hangmandrawing-main-container"]}`}>
        <EnergyBar wrongGuesses={wrongGuessesCount} />
      </div>
    </>
  );
}

export { HangmanDrawing };
