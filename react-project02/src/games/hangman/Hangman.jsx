import { useEffect, useState } from "react";
import ProgressParts from "./ProgressParts";
import Keyboard from "./Keyboard";
import data from "./data";
import "./styles.scss";

function Hangman() {
  const [word, setWord] = useState("");
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [corrects, setCorrects] = useState([]);
  const [fails, setFails] = useState([]);
  const [status, setStatus] = useState("");
  const maxFails = 6;

  const getRandomWord = () => {
    const randIndex = Math.floor(Math.random() * data.length);
    setWord(data[randIndex].word.toUpperCase());
    setHint(data[randIndex].hint);
  };

  const wordToGuess = () => {
    return word
      .split("")
      .map((letter) => (corrects.includes(letter) ? letter : "_"))
      .join(" ");
  };

  const handleOnClickGuess = (letter) => {
    if (fails.length === maxFails && status) return;

    if (word.includes(letter)) {
      setCorrects((prevState) => [...prevState, letter]);
    } else {
      setFails((prevState) => [...prevState, letter]);
    }
  };

  const handleResetGame = () => {
    getRandomWord();
    setShowHint(false);
    setCorrects([]);
    setFails([]);
    setStatus("");
  };

  useEffect(() => {
    handleResetGame();
  }, []);

  useEffect(() => {
    if (
      corrects.length &&
      word.split("").every((letter) => corrects.includes(letter))
    ) {
      setStatus("You won!");
    }
  }, [corrects]);

  useEffect(() => {
    if (fails.length === maxFails) {
      setStatus("You failed! Better luck next time...");
    }
  }, [fails]);

  // console.log(word, corrects, fails, status);

  return (
    <div className="game--hangman maxwidth mwmedium center">
      <ProgressParts fails={fails} />
      <div className="word">
        {status ? (
          <div
            dangerouslySetInnerHTML={{
              __html: word
                .split("")
                .map((letter) =>
                  corrects.includes(letter) ? letter : `<span>${letter}</span>`
                )
                .join(" "),
            }}
          />
        ) : (
          wordToGuess()
        )}
      </div>
      {status ? (
        <div className="status">
          {status}
          <br />
          <button onClick={handleResetGame}>Play Again</button>
        </div>
      ) : (
        <>
          <div className="hint">
            {showHint ? (
              `"${hint}"`
            ) : (
              <button
                onClick={() => {
                  setShowHint(true);
                }}
              >
                Take a hint?
              </button>
            )}
          </div>
          <Keyboard
            corrects={corrects}
            fails={fails}
            onClick={handleOnClickGuess}
          />
        </>
      )}
    </div>
  );
}

export default Hangman;
