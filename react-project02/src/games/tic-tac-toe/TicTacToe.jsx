import { useEffect, useState } from "react";
import useLocalStorage from "../../helpers/useLocalStorage";
import Squares from "./Squares";
import "./styles.scss";

function TicTacToe() {
  const [p1Name, setP1Name] = useLocalStorage("TTTPlayer1", "player1");
  const [p2Name, setP2Name] = useLocalStorage("TTTPlayer2", "player2");
  const [boardSquares, setBoardSquares] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [versusComputer, setVersusComputer] = useState(false);
  const [message, setMessage] = useState("");

  const getWinner = (squares) => {
    const winnerPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winnerPattern.length; i++) {
      const [a, b, c] = winnerPattern[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSquareClick = (currentSquare) => {
    const copyBoardSquares = [...boardSquares];
    // If user click an occupied square or if game is won, return
    if (
      getWinner(copyBoardSquares) ||
      copyBoardSquares[currentSquare] ||
      (versusComputer && !isXTurn)
    )
      return;

    // Put an X or an O in the clicked square
    copyBoardSquares[currentSquare] = isXTurn ? "X" : "O";

    setIsXTurn(!isXTurn);
    setBoardSquares(copyBoardSquares);
  };

  const handleRestart = () => {
    setBoardSquares(Array(9).fill(null));
    setIsXTurn(true);
  };

  const handleOpponent = (type = null) => {
    setP2Name(type ? "computer" : "player2");
    setVersusComputer(type ? true : false);
    handleRestart();
  };

  useEffect(() => {
    // console.log(boardSquares);

    const p1Value = `<span class="p1-color">${p1Name}</span>`;
    const p2Value = `<span class="${
      versusComputer ? "p0-color" : "p2-color"
    }">${p2Name}</span>`;

    if (
      !getWinner(boardSquares) &&
      boardSquares.every((square) => square !== null)
    ) {
      setMessage("This is a draw!!!");
    } else if (getWinner(boardSquares)) {
      // setMessage(`Winner is ${getWinner(boardSquares)}!`);
      setMessage(
        `Game Over!!!<br />${
          getWinner(boardSquares) === "X" ? p1Value : p2Value
        } won at this game.`
      );
    } else {
      if (boardSquares.filter((square) => square !== null).length) {
        // setMessage(`Next player is ${isXTurn ? "X" : "O"}`);
        setMessage(`Next to make a move is ${isXTurn ? p1Value : p2Value}.`);
      } else {
        // setMessage("Start player X");
        setMessage(`Start your ${p1Value}.`);

        if (p2Name === "computer") {
          setVersusComputer(true);
        }
      }
    }
  }, [boardSquares, isXTurn]);

  // Computer move
  useEffect(() => {
    if (versusComputer && !isXTurn && !getWinner(boardSquares)) {
      let arrNulls = [];
      boardSquares.map((item, index) => {
        if (item === null) {
          arrNulls.push(index);
        }
      });
      const randIndex = arrNulls[Math.floor(Math.random() * arrNulls.length)];
      console.log(arrNulls, randIndex);

      // Set a delay
      const timeoutId = setTimeout(() => {
        const copyBoardSquares = [...boardSquares];
        copyBoardSquares[randIndex] = "O";
        setIsXTurn(!isXTurn);
        setBoardSquares(copyBoardSquares);
      }, 1000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    }
  }, [boardSquares, isXTurn, versusComputer]);

  return (
    <div className="game--tic-tac-toe maxwidth mwsmall center">
      <div className="players">
        <div>
          <input
            type="text"
            maxLength={13}
            value={p1Name}
            onChange={(e) => setP1Name(e.target.value)}
            onFocus={(e) => {
              e.target.value = "";
            }}
            onBlur={(e) => {
              e.target.value = p1Name;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
          />
        </div>
        <div>
          <input
            type="text"
            maxLength={13}
            value={p2Name}
            onChange={(e) => setP2Name(e.target.value)}
            onFocus={(e) => {
              e.target.value = "";
            }}
            onBlur={(e) => {
              e.target.value = p2Name;
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.blur();
              }
            }}
            disabled={versusComputer ? true : false}
          />
        </div>
      </div>
      <div className="board">
        {boardSquares.map((square, index) => (
          <Squares
            key={index}
            value={square}
            onClick={() => handleSquareClick(index)}
            vsComputer={versusComputer}
          />
        ))}
      </div>
      {/* <h3>{message}</h3> */}
      <h3 dangerouslySetInnerHTML={{ __html: message }} />
      {boardSquares.filter((square) => square !== null).length > 0 ? (
        <button onClick={handleRestart}>Restart</button>
      ) : (
        <>
          {versusComputer ? (
            <button onClick={() => handleOpponent()}>Play VS Human</button>
          ) : (
            <button onClick={() => handleOpponent("computer")}>
              Play VS Computer
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default TicTacToe;
