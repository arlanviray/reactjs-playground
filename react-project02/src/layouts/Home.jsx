import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <h2>Experimental Projects:</h2>
      <ol>
        <li>
          <Link to="/accordion">Accordion</Link>
        </li>
        <li>
          <Link to="/random-color">Random Color</Link>
        </li>
      </ol>
    </>
  );
}

export default Home;
