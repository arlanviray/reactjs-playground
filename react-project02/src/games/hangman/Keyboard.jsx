function Keyboard({ corrects, fails, onClick }) {
  return (
    <div className="keyboard">
      {Array.from(Array(26)).map((_, index) => {
        const letter = String.fromCharCode(65 + index);

        return (
          <button
            key={index}
            disabled={corrects.includes(letter) || fails.includes(letter)}
            onClick={() => onClick(letter)}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}

export default Keyboard;
