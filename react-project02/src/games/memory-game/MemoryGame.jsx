import { useEffect, useState } from "react";
import useLocalStorage from "../../helpers/useLocalStorage";
import Card from "./Card";
import data from "./data";
import "./styles.scss";

function MemoryGame() {
  const [cardsArray, setCardsArray] = useState([]);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [level, setLevel] = useLocalStorage("MemoryGameTiles", 12);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(0);
  const [stopFlip, setStopFlip] = useState(false);

  const newGame = () => {
    setCardsArray([]);

    setTimeout(() => {
      // randomise data array
      const randomItems = data.sort(() => 0.5 - Math.random());
      // get x number of items in array
      const selectedItems = randomItems.slice(0, level);
      // clone and merge array
      const mergedItems = [...selectedItems, ...selectedItems];
      // add unique id from each item
      const cardItems = mergedItems.map((card, index) => ({
        id: index + 1,
        ...card,
      }));

      setCardsArray(cardItems.sort(() => 0.5 - Math.random())); // randomise final card items
      setFirstCard(null);
      setSecondCard(null);
      setMoves(0);
      setWon(0);
    }, 1000);
  };

  // this function helps in storing the firstCard and secondCard value
  const handleSelectedCards = (item) => {
    // console.log(item);
    if (firstCard !== null && firstCard.id !== item.id) {
      setSecondCard(item);
    } else {
      setFirstCard(item);
    }
  };

  // select on change value
  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  // after the slected images have been checked for equivalency we empty the firstCard and secondCard component
  const removeSelection = () => {
    setFirstCard(null);
    setSecondCard(null);
    setStopFlip(false);
    setMoves((prevValue) => prevValue + 1);
  };

  // if two have been selected then we check if the images are same or not,
  // if they are same then we stop the flipping ability
  // else we turn them back
  useEffect(() => {
    if (firstCard && secondCard) {
      setStopFlip(true);
      if (firstCard.name === secondCard.name) {
        setCardsArray((prevArray) => {
          return prevArray.map((unit) => {
            if (unit.name === firstCard.name) {
              return { ...unit, matched: true };
            } else {
              return unit;
            }
          });
        });
        setWon((preVal) => preVal + 1);
        removeSelection();
      } else {
        setTimeout(() => {
          removeSelection();
        }, 1000);
      }
    }
  }, [firstCard, secondCard]);

  // starts the game for the first time.
  useEffect(() => {
    newGame();
  }, [level]);

  // console.log(cardsArray);

  return (
    <div className={`game--memory-game maxwidth tiles-${level}`}>
      <div className="level">
        <strong>LEVEL:</strong>
        <select value={level} onChange={handleLevelChange}>
          <option value="12">Easy</option>
          <option value="18">Hard</option>
          <option value="24">Hardest</option>
        </select>
      </div>

      <div className="cards">
        {cardsArray.map((item) => (
          <Card
            key={item.id}
            item={item}
            handleSelectedCards={handleSelectedCards}
            toggled={
              item === firstCard || item === secondCard || item.matched === true
            }
            stopFlip={stopFlip}
          />
        ))}
      </div>

      {cardsArray.length > 0 && (
        <div className="message center">
          <strong>Moves:</strong> {moves}
        </div>
      )}
    </div>
  );
}

export default MemoryGame;
