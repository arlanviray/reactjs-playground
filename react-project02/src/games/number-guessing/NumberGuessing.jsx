import { useEffect, useState } from "react";
import useLocalStorage from "../../helpers/useLocalStorage";
import imgGameOver from "../../assets/gameover.png";
import webpWellDone from "../../assets/welldone.webp";
import "./styles.scss";

function NumberGuessing() {
  const [recordGuesses, setRecordGuesses] = useLocalStorage(
    "GuessNumberRecord",
    0
  );
  const [newRecord, setNewRecord] = useState(false);
  const [numberToGuess, setNumberToGuess] = useState(0);
  const [userGuess, setUserGuess] = useState(0);
  const [guessAttempts, setGuessAttempts] = useState([]);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [endGame, setEndGame] = useState(false);

  const maxGuesses = 10;
  const maxGuessNumber = 100;

  const handleSubmit = (e) => {
    e.preventDefault();

    setGuessAttempts((prevState) => [...prevState, userGuess]);

    const numberOfGuesses = Number(guessAttempts.length + 1);

    if (Number(userGuess) === numberToGuess) {
      setSuccess(true);
      setEndGame(true);

      if (recordGuesses === 0 || recordGuesses > numberOfGuesses) {
        setRecordGuesses(numberOfGuesses);
        if (recordGuesses > 0) {
          setNewRecord(true);
        }
      }
    } else {
      if (numberOfGuesses === maxGuesses) {
        setMessage("You made too many guesses!");
        setEndGame(true);
      } else {
        if (userGuess > numberToGuess) {
          setMessage("HIGH");
        } else if (userGuess < numberToGuess) {
          setMessage("LOW");
        }
      }
    }
  };

  const handleOnChange = (e) => {
    setUserGuess(e.target.value);
  };

  const handleNewGame = () => {
    setNumberToGuess(Math.floor(Math.random() * maxGuessNumber) + 1);
    setUserGuess(0);
    setGuessAttempts([]);
    setSuccess(false);
    setEndGame(false);
    setNewRecord(false);
  };

  useEffect(() => {
    handleNewGame();
  }, []);

  // console.log(guessAttempts, success);

  return (
    <div className="number-guessing maxwidth mwmedium center">
      {/* <h2 style={{ display: "none" }}>{numberToGuess}</h2> */}

      {(() => {
        if (endGame) {
          return (
            <div className="game-end">
              <div className="gameover">
                <img src={imgGameOver} />
              </div>
              {success ? (
                <>
                  <p className="message-success">
                    It took you <span>{guessAttempts.length}</span> guesses
                    {newRecord ? " plus you beat your current record!" : ""}
                  </p>
                  <picture>
                    <source srcSet={webpWellDone} type="image/webp" />
                    <img src={webpWellDone} />
                  </picture>
                </>
              ) : (
                <p className="message-fail">{message}</p>
              )}
              <button onClick={handleNewGame}>NEW GAME</button>
            </div>
          );
        } else {
          return (
            <div className="game-start">
              {recordGuesses > 0 && (
                <h3>Your current record guess attempts is {recordGuesses}</h3>
              )}

              <h2>
                I am thinking of a number between{" "}
                <span>1-{maxGuessNumber}</span>
                <br />
                Can you guess it?
              </h2>

              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  min="1"
                  max={maxGuessNumber}
                  value={userGuess}
                  onChange={handleOnChange}
                />
                <br />
                <input
                  type="submit"
                  value="GUESS"
                  disabled={guessAttempts.includes(userGuess)}
                />
              </form>

              {guessAttempts.length > 0 && (
                <>
                  <p className="message-fail">
                    Incorrect, your guess is too {message}!
                  </p>
                  <p className="numb-of-guesses">
                    <strong>Number of Guesses:</strong>
                    <br />
                    <span>{guessAttempts.length}</span> OF {maxGuesses}
                  </p>
                  <p className="prev-guesses">
                    <strong>Previous Guesses:</strong>
                    <br />
                    {/* {guessAttempts.join(", ")} */}
                    {guessAttempts.map((number, index) => (
                      <span key={index}>
                        {number}
                        {guessAttempts.length !== index + 1 && ", "}
                      </span>
                    ))}
                  </p>
                </>
              )}
            </div>
          );
        }
      })()}
    </div>
  );
}

export default NumberGuessing;
