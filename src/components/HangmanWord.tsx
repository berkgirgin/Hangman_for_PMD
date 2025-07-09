import classes from "../styles/HangmanWord.module.css";
import { useHangmanContext } from "../context/HangmanProvider";
import { useMemo } from "react";

function HangmanWord() {
  const { wordToGuess, usedLetters } = useHangmanContext();

  const lettersToDisplay = useMemo(
    () =>
      wordToGuess.split("").map((char, index) => {
        const isVisible =
          wordToGuess.includes(char) && usedLetters.includes(char);

        return (
          <div
            key={index}
            className={`${classes.letter} ${
              isVisible ? classes.visible : classes.hidden
            }`}
            aria-hidden={!isVisible}
          >
            {isVisible ? char.toUpperCase() : ""}
          </div>
        );
      }),
    [wordToGuess, usedLetters]
  );

  return (
    <div className={classes["hangmanword-main-container"]}>
      {/* <h2>Hangman Word</h2> */}
      <div className={classes["hangmanword-display-container"]}>
        {lettersToDisplay}
      </div>
    </div>
  );
}

export { HangmanWord };
