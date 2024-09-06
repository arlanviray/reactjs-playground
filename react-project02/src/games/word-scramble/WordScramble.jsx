import { useEffect, useState } from "react";
import useLocalStorage from "../../helpers/useLocalStorage";
import data from "./data";
import "./styles.scss";

function WordScramble() {
  const maxTime = 60;
  const [retrieveData, setRetrieveData] = useState([]);
  const [scrambleWord, setScrambleWord] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [countdown, setCountdown] = useState(maxTime);
  const [corrects, setCorrects] = useState(0);
  const [recordCorrects, setRecordCorrects] = useLocalStorage(
    "WordScrambleRecord",
    0
  );
  const [recordBroke, setRecordBroke] = useState(false);
  const [message, setMessage] = useState("");
  const [endGame, setEndGame] = useState(false);

  const getScrambleWord = (str) => {
    const chars = str.split("");
    chars.sort(() => 0.5 - Math.random());
    const scrambled = chars.join(" ");

    return scrambled;
  };

  const getRandomData = () => {
    const randIndex = Math.floor(Math.random() * data.length);
    setRetrieveData(data[randIndex]);
    setScrambleWord(getScrambleWord(data[randIndex].word));
  };

  const handleCheckWord = () => {
    if (inputValue === "") {
      setMessage("Field cannot be empty.");
    } else {
      if (retrieveData.word === inputValue.toLocaleLowerCase()) {
        getRandomData();
        setInputValue("");
        setCorrects((prevState) => prevState + 1);
        setMessage("Correct!");
      } else {
        setMessage("Incorrect!");
      }
    }
  };

  const handleRefreshWord = () => {
    setScrambleWord(getScrambleWord(retrieveData.word));
  };

  const handleReset = () => {
    getRandomData();
    setInputValue("");
    setCountdown(maxTime);
    setCorrects(0);
    setRecordBroke(false);
    setMessage("");
    setEndGame(false);
  };

  useEffect(() => {
    handleReset();
  }, []);

  useEffect(() => {
    if (endGame) return;

    const timeout = setTimeout(() => {
      setMessage("");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [message]);

  useEffect(() => {
    if (countdown === 0) {
      setEndGame(true);
      setMessage(
        `<p>Game Over!!!</p>The correct word is ${retrieveData.word.toUpperCase()}`
      );
      if (corrects > recordCorrects) {
        setRecordCorrects(corrects);
        setRecordBroke(true);
      }
    } else {
      const interval = setInterval(() => {
        setCountdown((prevState) => prevState - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [countdown]);

  // console.log(retrieveData.word, scrambleWord);

  return (
    <div className="game--word-scramble maxwidth mwmedium center">
      <h1>{scrambleWord}</h1>
      <p>
        <strong>Hint:</strong> {retrieveData.hint}
      </p>

      {!endGame && (
        <>
          <div>Time Left: {countdown}s</div>
          <div>
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCheckWord();
                }
              }}
            />
          </div>
        </>
      )}

      <div
        className="message"
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>

      <div className="buttons">
        {endGame ? (
          <button onClick={handleReset}>Play Again</button>
        ) : (
          <>
            <button onClick={handleRefreshWord}>Refresh Word</button>
            <button onClick={handleCheckWord}>Check Word</button>
          </>
        )}
      </div>

      <div>
        <div>Corrects: {corrects}</div>
        <div>Current Record: {recordCorrects}</div>
      </div>
      {endGame && recordBroke && <div>Nice, you have broke your record.</div>}
    </div>
  );
}

export default WordScramble;
