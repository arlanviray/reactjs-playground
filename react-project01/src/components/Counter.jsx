import { useState } from "react";

function Counter({ title }) {
  const [count, setCount] = useState(5);

  return (
    <>
      <h1>{title}</h1>

      <section>
        <div className="proj-counter">
          <div className="number">{count}</div>

          <div className="buttons">
            <button
              onClick={() => {
                setCount(count + 1);
              }}
            >
              +
            </button>
            <button
              onClick={() => {
                setCount(count - 1);
              }}
            >
              -
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Counter;
