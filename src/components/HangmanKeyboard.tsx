// import classes from "../styles/HangmanKeyboard.module.css";
// import { KEYS } from "../data/keyboardKeys";
// import { useHangmanContext } from "../context/HangmanProvider";

// function HangmanKeyboard() {
//   const hangman = useHangmanContext();

//   const keyElements = KEYS.map((key: string) => {
//     const isUsed: boolean = hangman.usedLetters.includes(key);
//     return (
//       <div
//         key={key}
//         data-charactervalue={key}
//         onClick={(e): void => {
//           onKeyClickHandler(key);
//         }}
//         className={`${classes["key"]} ${isUsed ? classes["used-letter"] : ""}`}
//       >
//         {key.toUpperCase()}
//       </div>
//     );
//   });

//   function onKeyClickHandler(characterValue: string): void {
//     if (hangman.usedLetters.includes(characterValue)) return;

//     hangman.playTurn(characterValue);
//   }

//   return (
//     <>
//       <div className={`${classes["hangmankeyboard-main-container"]}`}>
//         {/* <h2>Hangman Keyboard</h2> */}
//         <div className={`${classes["keys-main-container"]}`}>{keyElements}</div>
//       </div>
//     </>
//   );
// }

// export { HangmanKeyboard };

import classes from "../styles/HangmanKeyboard.module.css";
import { useHangmanContext } from "../context/HangmanProvider";

function HangmanKeyboard() {
  const hangman = useHangmanContext();

  const qwertyRows: string[][] = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  function onKeyClickHandler(characterValue: string): void {
    if (hangman.usedLetters.includes(characterValue)) return;

    hangman.playTurn(characterValue);
  }

  const keyElements = qwertyRows.map((row, rowIndex) => (
    <div key={rowIndex} className={classes["key-row"]}>
      {row.map((key) => {
        const isUsed = hangman.usedLetters.includes(key);
        return (
          <div
            key={key}
            data-charactervalue={key}
            onClick={() => onKeyClickHandler(key)}
            className={`${classes["key"]} ${
              isUsed ? classes["used-letter"] : ""
            }`}
          >
            {key.toUpperCase()}
          </div>
        );
      })}
    </div>
  ));

  return (
    <div className={classes["hangmankeyboard-main-container"]}>
      <div className={classes["keys-main-container"]}>{keyElements}</div>
    </div>
  );
}

export { HangmanKeyboard };
