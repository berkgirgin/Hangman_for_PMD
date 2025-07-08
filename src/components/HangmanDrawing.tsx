import classes from "../styles/HangmanDrawing.module.css";
import { useHangmanContext } from "../context/HangmanProvider";
import { EnergyBar } from "./EnergyBar";

function HangmanDrawing() {
  const hangman = useHangmanContext();
  const usedLetters = hangman.usedLetters;

  const playedTurnsCount = hangman.numberOfTurns.allTurns;
  const wrongGuessesCount = hangman.numberOfTurns.failedTurns;
  const correctGuessesCount = playedTurnsCount - wrongGuessesCount;

  if (wrongGuessesCount > 5) {
    throw new Error("energybar animation would not want more than 5 guesses");
  }

  return (
    <>
      {/* <div className={`${classes["hangmandrawing-main-container"]}`}>
        <h2>Hangman Drawing</h2>
        <div className={`${classes["turn-count-container"]}`}>
          <div>played {playedTurnsCount} turns</div>
          <div>Guessed wrong: {wrongGuessesCount} times</div>
          <div>Guessed correct: {correctGuessesCount} times</div>
        </div>
        <div>
          Used Letters:
          {usedLetters.map((key: string) => {
            return <span key={key}> {key} </span>;
          })}
        </div>
        <EnergyBar wrongGuesses={wrongGuessesCount} />
      </div> */}
      <div className={`${classes["hangmandrawing-main-container"]}`}>
        <EnergyBar wrongGuesses={wrongGuessesCount} />
      </div>
    </>
  );
}

export { HangmanDrawing };
