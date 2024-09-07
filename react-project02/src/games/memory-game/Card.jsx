function Card({ item, handleSelectedCards, toggled, stopFlip }) {
  return (
    <div className="item">
      <div className={toggled ? "toggled" : ""}>
        <img className="face" src={item.image} />
        <div
          className="back"
          onClick={() => !stopFlip && handleSelectedCards(item)}
        ></div>
      </div>
    </div>
  );
}

export default Card;
