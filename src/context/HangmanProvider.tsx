import {
  useContext,
  createContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import { KEYS } from "../data/keyboardKeys";
import { listOfWords } from "../data/listOfWords";
import characterVideoSrc from "../assets/video_messages/muck.mp4";
import correctGuessVideoSrc from "../assets/video_messages/muck.mp4";
import wrongGuessVideoSrc from "../assets/video_messages/no.mp4";
import winVideoSrc from "../assets/video_messages/win_video.mp4";
import loseVideoSrc from "../assets/video_messages/lose_video.mp4";

type HangmanProviderProps = { children: ReactNode };

type HangmanContextType = {
  usedLetters: string[];
  wordToGuess: string;
  numberOfTurns: { failedTurns: number; allTurns: number };
  addGuessedLetter: (characterValue: string) => void;
  getRandomWordToGuess: () => string;
  characterVideo: string;
  playTurn: (characterValue: string) => void;
  resetGame: () => void;
  isGameEnding: boolean;
  gameStatus: string;
};

const hangmanContext = createContext<HangmanContextType | null>(null);

function useHangmanContext() {
  const context = useContext(hangmanContext);
  if (!context) {
    throw new Error("useHangmanContext must be used within a HangmanProvider");
  }
  return context;
}

function HangmanProvider({ children }: HangmanProviderProps) {
  const navigate = useNavigate();

  // Function must be declared *before* state since it’s used in initial state
  function getRandomWordToGuess(): string {
    // return "beeeeeerrrkk"; // Replace with real random word logic later
    const randomIndex = Math.floor(Math.random() * listOfWords.length);
    return listOfWords[randomIndex];
  }

  const [wordToGuess, setWordToGuess] = useState<string>(
    getRandomWordToGuess()
  );
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [numberOfTurns, setNumberOfTurns] = useState({
    failedTurns: 0,
    allTurns: 0,
  });
  const [gameStatus, setGameStatus] = useState<"win" | "lose" | "ongoing">(
    "ongoing"
  );
  const [characterVideo, setCharacterVideo] = useState<string>(""); // default empty or idle video path
  const [videoPlayCount, setVideoPlayCount] = useState(0);
  const [isGameEnding, setIsGameEnding] = useState(false);

  let audioUnlocked = false;

  function unlockAudio() {
    if (audioUnlocked) return;

    // Use the standard AudioContext, fallback to webkitAudioContext with casting
    const AudioContextClass = (window.AudioContext ||
      (window as any).webkitAudioContext) as typeof AudioContext;

    const audioCtx = new AudioContextClass();
    const oscillator = audioCtx.createOscillator();
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.01);

    audioUnlocked = true;
  }

  function addGuessedLetter(characterValue: string): void {
    setUsedLetters((prevLetters) => {
      if (prevLetters.includes(characterValue)) return prevLetters;
      return [...prevLetters, characterValue];
    });
  }

  function updateTurnCounts(characterValue: string) {
    setNumberOfTurns((prev) => ({
      failedTurns: !wordToGuess.includes(characterValue)
        ? prev.failedTurns + 1
        : prev.failedTurns,
      allTurns: prev.allTurns + 1,
    }));
  }

  function gameOver() {
    // Set characterVideo based on win or lose

    if (gameStatus === "win") {
      // navigate("/end_page/win");
      setCharacterVideo(winVideoSrc + `?t=${videoPlayCount}`);
    } else if (gameStatus === "lose") {
      // navigate("/end_page/lose");
      setCharacterVideo(loseVideoSrc + `?t=${videoPlayCount}`);
    }
    setVideoPlayCount((c) => c + 1);
  }

  function resetGame() {
    setWordToGuess(getRandomWordToGuess());
    setUsedLetters([]);
    setNumberOfTurns({ failedTurns: 0, allTurns: 0 });
    setGameStatus("ongoing");
    setCharacterVideo(""); // reset video to empty or idle state
    setVideoPlayCount(0);
    setIsGameEnding(false);
  }

  function playTurn(characterValue: string) {
    if (usedLetters.includes(characterValue)) {
      throw new Error("You can't playTurn for an already played letter");
    }
    if (characterValue.length !== 1) {
      throw new Error("characterValue must be a single character");
    }

    unlockAudio();

    addGuessedLetter(characterValue);
    updateTurnCounts(characterValue);
    // NO direct updateGameStatus or navigation here — handled reactively below

    // Set characterVideo based on correctness of guess
    if (wordToGuess.includes(characterValue)) {
      setCharacterVideo(correctGuessVideoSrc + `?t=${videoPlayCount}`);
    } else {
      setCharacterVideo(wrongGuessVideoSrc + `?t=${videoPlayCount}`);
    }

    setVideoPlayCount((c) => c + 1);
  }

  // Update game status reactively based on current state
  useEffect(() => {
    const uniqueLetters = Array.from(new Set(wordToGuess.split("")));
    const hasWon = uniqueLetters.every((letter) =>
      usedLetters.includes(letter)
    );
    const allKeysUsed = KEYS.every((key) => usedLetters.includes(key));

    if (hasWon) {
      setGameStatus("win");
    } else if (numberOfTurns.failedTurns >= 10 || allKeysUsed) {
      setGameStatus("lose");
    } else {
      setGameStatus("ongoing");
    }
  }, [usedLetters, numberOfTurns, wordToGuess]);

  // Navigate on game end (win or lose)
  useEffect(() => {
    if (gameStatus === "ongoing") return;

    setIsGameEnding(true); // show overlay
    gameOver();

    // const timeoutId = setTimeout(() => {
    //   gameOver(); // navigate
    // }, 55000);

    // return () => clearTimeout(timeoutId);
  }, [gameStatus]);

  return (
    <hangmanContext.Provider
      value={{
        usedLetters,
        wordToGuess,
        numberOfTurns,
        addGuessedLetter,
        getRandomWordToGuess,
        characterVideo,
        playTurn,
        resetGame,
        isGameEnding,
        gameStatus,
      }}
    >
      {children}
    </hangmanContext.Provider>
  );
}

export { HangmanProvider, useHangmanContext };
