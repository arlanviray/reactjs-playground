function Squares({ value, onClick, vsComputer }) {
  let styleColor = "";
  if (value === "X") {
    styleColor = "p1-color";
  } else if (value === "O") {
    if (vsComputer) {
      styleColor = "p0-color";
    } else {
      styleColor = "p2-color";
    }
  }

  return (
    <button className={styleColor} onClick={onClick}>
      {value}
    </button>
  );
}

export default Squares;
