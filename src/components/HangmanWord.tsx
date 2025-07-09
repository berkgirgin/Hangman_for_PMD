import classes from "../styles/HangmanWord.module.css";
import { useHangmanContext } from "../context/HangmanProvider";
import { useMemo } from "react";

function HangmanWord() {
  const { wordToGuess, usedLetters, gameStatus } = useHangmanContext();

  const lettersToDisplay = useMemo(
    () =>
      wordToGuess.split("").map((char, index) => {
        const isGuessed = usedLetters.includes(char);
        const isGameLost = gameStatus === "lose";
        const showLetter = isGuessed || isGameLost;

        let className = `${classes.letter}`;
        if (isGuessed) {
          className += ` ${classes.visible}`;
        } else if (isGameLost) {
          className += ` ${classes.missing}`;
        } else {
          className += ` ${classes.hidden}`;
        }

        return (
          <div key={index} className={className} aria-hidden={!showLetter}>
            {showLetter ? char.toUpperCase() : ""}
          </div>
        );
      }),
    [wordToGuess, usedLetters, gameStatus]
  );

  return (
    <div className={classes["hangmanword-main-container"]}>
      <div className={classes["hangmanword-display-container"]}>
        {lettersToDisplay}
      </div>
    </div>
  );
}

export { HangmanWord };
