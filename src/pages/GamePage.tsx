import classes from "../styles/GamePage.module.css";
import { useEffect, useState } from "react";
import { HangmanDrawing } from "../components/HangmanDrawing";
import { HangmanKeyboard } from "../components/HangmanKeyboard";
import { HangmanWord } from "../components/HangmanWord";
import { CharacterCircle } from "../components/CharacterCircle";

import { useHangmanContext } from "../context/HangmanProvider";

function GamePage() {
  const hangman = useHangmanContext();
  const characterVideo = hangman.characterVideo;

  return (
    <>
      <div className={`${classes["gamepage-main-container"]}`}>
        {/* <h1>Game Page: guess the word</h1> */}
        <div className={`${classes["gamepage-character-container"]}`}>
          {/* <h2>P.M.D reactions</h2> */}
          <CharacterCircle videoSrc={characterVideo} />
          <HangmanDrawing />
        </div>

        <div className={`${classes["gamepage-game-container"]}`}>
          <HangmanWord />
          <HangmanKeyboard />
        </div>
      </div>
    </>
  );
}

export { GamePage };
