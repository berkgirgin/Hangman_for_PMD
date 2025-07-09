// import classes from "../styles/StartPage.module.css";
// import { useNavigate } from "react-router-dom";

// function StartPage() {
//   const navigate = useNavigate();

//   function handleStartGame() {
//     navigate("/game_page");
//   }

//   return (
//     <>
//       <div className={`${classes["startpage-main-container"]}`}>
//         <h1>Start Page</h1>
//         <button onClick={handleStartGame}>Start Game</button>
//       </div>
//     </>
//   );
// }

// export { StartPage };

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CharacterCircle } from "../components/CharacterCircle";
import placeholderImg from "../assets/images/tv_no_signal.gif"; // your placeholder image path
import startVideoSrc from "../assets/video_messages/guzel_yuvarlak.mp4"; // your start video path
import styles from "../styles/StartPage.module.css";

import { useHangmanContext } from "../context/HangmanProvider";

let audioUnlocked = false;
function unlockAudio() {
  if (audioUnlocked) return;
  const AudioContextClass = (window.AudioContext ||
    (window as any).webkitAudioContext) as typeof AudioContext;
  const audioCtx = new AudioContextClass();
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.01);
  audioUnlocked = true;
}

export function StartPage() {
  const navigate = useNavigate();
  const hangman = useHangmanContext();

  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function handleStartGame() {
    hangman.resetGame();
    navigate("/game_page");
  }

  function onCircleClick() {
    if (isPlaying) return; // prevent double click during video playback

    unlockAudio();

    setVideoSrc(startVideoSrc);
    setIsPlaying(true);
  }

  function onVideoEnded() {
    setIsPlaying(false);
    setVideoSrc(null);
    handleStartGame();
  }

  return (
    <div className={styles.startpageContainer}>
      <header className={styles.header}>
        <h1 className={styles.bigTitle}>Guess the Romantic Words</h1>
        <h2 className={styles.smallTitle}>watch your health bar!</h2>
      </header>

      <div className={styles.characterSection}>
        <p className={styles.clickMeTitle}>CLICK ME</p>

        <CharacterCircle
          placeholderMedia={{ type: "img", src: placeholderImg }}
          videoSrc={videoSrc || ""}
          onClick={onCircleClick}
          onVideoEnded={onVideoEnded}
        />
      </div>
    </div>
  );
}
