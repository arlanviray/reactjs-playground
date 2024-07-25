import { Link } from "react-router-dom";

function Error() {
  return (
    <>
      <main className="center">
        <h1>Ooops!</h1>
        <p>Sorry, an expected error has occured.</p>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </main>
    </>
  );
}

export default Error;
