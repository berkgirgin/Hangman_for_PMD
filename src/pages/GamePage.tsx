import classes from "../styles/GamePage.module.css";
import { HangmanDrawing } from "../components/HangmanDrawing";
import { HangmanKeyboard } from "../components/HangmanKeyboard";
import { HangmanWord } from "../components/HangmanWord";
import { CharacterCircle } from "../components/CharacterCircle";

import { useHangmanContext } from "../context/HangmanProvider";

import placeholderVideo from "../assets/video_messages/long_status_video.mp4";

function GamePage() {
  const hangman = useHangmanContext();
  const characterVideo = hangman.characterVideo;
  const isGameOver = hangman.gameStatus !== "ongoing";

  return (
    <>
      {hangman.isGameEnding && (
        <div
          className={`${classes.gameEndingOverlay} ${
            hangman.gameStatus === "win" ? classes.win : classes.lose
          }`}
        />
      )}

      <div className={classes["gamepage-main-container"]}>
        <div className={classes["gamepage-character-container"]}>
          <CharacterCircle
            placeholderMedia={{ type: "video", src: placeholderVideo }}
            videoSrc={characterVideo}
          />
          <HangmanDrawing />
        </div>

        <div className={classes["gamepage-game-container"]}>
          <div
            className={`${classes.hangmanWordWrapper} ${
              isGameOver ? classes.hangmanWordGameOver : ""
            }`}
          >
            <HangmanWord />
          </div>

          {isGameOver ? (
            <button className={classes.heartButton} onClick={hangman.resetGame}>
              <span className={classes.heartButtonText}>New Game</span>
            </button>
          ) : (
            <HangmanKeyboard />
          )}
        </div>
      </div>
    </>
  );
}

export { GamePage };
