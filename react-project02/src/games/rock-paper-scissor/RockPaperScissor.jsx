import { useEffect, useState } from "react";
import {
  FaHandPaper,
  FaHandRock,
  FaHandScissors,
  FaHandshake,
} from "react-icons/fa";
import useLocalStorage from "../../helpers/useLocalStorage";
import imgGameOver from "../../assets/gameover.png";
import webpWellDone from "../../assets/welldone.webp";
import "./styles.scss";

function RockPaperScissor() {
  const initName = "Enter Alias";
  const [playerName, setPlayerName] = useLocalStorage(
    "RPSPlayerName",
    initName
  );
  const dataOptions = ["rock", "paper", "scissors"];
  const [playerScore, setPlayerScore] = useState(0);
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerScore, setComputerScore] = useState(0);
  const [computerChoice, setComputerChoice] = useState("");
  const [message, setMessage] = useState("");
  const [movesRemaining, setMovesRemaining] = useState(10);
  const [stagesWinner, setStagesWinner] = useState("");

  const computerRandomChoice = () => {
    const choice = dataOptions[Math.floor(Math.random() * dataOptions.length)];
    setComputerChoice(choice);
    setMovesRemaining((prevState) => prevState - 1);
  };

  const handleClickRock = () => {
    setPlayerChoice(dataOptions[0]);
    computerRandomChoice();
  };
  const handleClickPaper = () => {
    setPlayerChoice(dataOptions[1]);
    computerRandomChoice();
  };
  const handleClickScissors = () => {
    setPlayerChoice(dataOptions[2]);
    computerRandomChoice();
  };

  const handleStagesWinner = (winner = null) => {
    if (winner === "plyr") {
      setPlayerScore((prevState) => prevState + 1);
      setMessage("You won!");
    } else if (winner === "comp") {
      setComputerScore((prevState) => prevState + 1);
      setMessage("Computer won!");
    } else {
      setMessage("It's a tie!");
    }

    setStagesWinner(winner);
  };

  const handlePlayAgain = () => {
    setPlayerScore(0);
    setPlayerChoice("");
    setComputerScore(0);
    setComputerChoice("");
    setMessage("");
    setMovesRemaining(10);
    setStagesWinner("");
  };

  useEffect(() => {
    // console.log("Player:", playerChoice, "Computer:", computerChoice);

    if (playerChoice === computerChoice) {
      handleStagesWinner();
    } else if (playerChoice === dataOptions[0]) {
      // player = rock
      if (computerChoice === dataOptions[2]) {
        handleStagesWinner("plyr");
      } else {
        handleStagesWinner("comp");
      }
    } else if (playerChoice === dataOptions[1]) {
      // player = paper
      if (computerChoice === dataOptions[0]) {
        handleStagesWinner("plyr");
      } else {
        handleStagesWinner("comp");
      }
    } else if (playerChoice === dataOptions[2]) {
      // player = scissors
      if (computerChoice === dataOptions[1]) {
        handleStagesWinner("plyr");
      } else {
        handleStagesWinner("comp");
      }
    }
  }, [playerChoice, computerChoice]);

  // console.log(playerChoice, computerChoice);

  return (
    <div className="game--rock-paper-scissor maxwidth mwmedium center">
      <div className="players">
        <div className="column">
          <div className="name field">
            <input
              type="text"
              maxLength={13}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onFocus={(e) => {
                e.target.value = "";
              }}
              onBlur={(e) => {
                e.target.value = playerName;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.blur();
                }
              }}
              className={
                playerName.toLowerCase() !== initName.toLowerCase()
                  ? "updatedname"
                  : ""
              }
            />
          </div>
          <div className="score">{playerScore}</div>
        </div>
        <div className="column">
          <div className="name">Computer</div>
          <div className="score">{computerScore}</div>
        </div>
      </div>

      {movesRemaining === 0 ? (
        // Game over result
        <div className="endgame">
          <div className="gameover">
            <img src={imgGameOver} />
          </div>

          {playerScore > computerScore && (
            <picture>
              <source srcSet={webpWellDone} type="image/webp" />
              <img src={webpWellDone} />
            </picture>
          )}

          <h2>
            {(() => {
              let resultType = "Tied";
              if (playerScore > computerScore) {
                resultType = "Won";
              } else if (playerScore < computerScore) {
                resultType = "Lost";
              }

              return `You ${resultType.toLocaleUpperCase()} at this game!`;
            })()}
          </h2>
          <button onClick={handlePlayAgain}>Play Again?</button>
        </div>
      ) : (
        // Play through stages
        <>
          {playerChoice && (
            <div className="players">
              <div className="column">
                <div
                  className={
                    "icons " +
                    (stagesWinner === "plyr" && stagesWinner + "-color")
                  }
                >
                  {playerChoice === dataOptions[0] && (
                    <FaHandRock className="plyr-rock" />
                  )}
                  {playerChoice === dataOptions[1] && (
                    <FaHandPaper className="plyr-paper" />
                  )}
                  {playerChoice === dataOptions[2] && (
                    <FaHandScissors className="plyr-scissors" />
                  )}
                </div>
              </div>
              <div className="column">
                <div
                  className={
                    "icons " +
                    (stagesWinner === "comp" && stagesWinner + "-color")
                  }
                >
                  {computerChoice === dataOptions[0] && (
                    <FaHandRock className="comp-rock" />
                  )}
                  {computerChoice === dataOptions[1] && (
                    <FaHandPaper className="comp-paper" />
                  )}
                  {computerChoice === dataOptions[2] && (
                    <FaHandScissors className="comp-scissors" />
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="messages">
            {playerChoice ? (
              <h2 className={stagesWinner + "-color"}>{message}</h2>
            ) : (
              <FaHandshake className="fashake" />
            )}
          </div>

          <div className="player-events">
            <h3>Choose your move</h3>
            <div className="buttons">
              <button onClick={handleClickRock}>
                <FaHandRock className="plyr-rock" />
                Rock
              </button>
              <button onClick={handleClickPaper}>
                <FaHandPaper className="plyr-paper" />
                Paper
              </button>
              <button onClick={handleClickScissors}>
                <FaHandScissors className="plyr-scissors" />
                Scissors
              </button>
            </div>
            <p>
              Moves remaining: <strong>{movesRemaining}</strong>
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default RockPaperScissor;
