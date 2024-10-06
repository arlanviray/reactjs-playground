import { Link } from "react-router-dom";

function Home() {
  const games = [
    "Number Guessing",
    "Rock, Paper, Scissor",
    "Tic Tac Toe",
    "Memory Game",
    "Hangman",
    "Word Scramble",
  ];

  const projects = [
    // "Accordion",
    "Random Color",
    "Star Rating",
    "Image Slider",
    "Loadmore Data",
    // "Tree View",
    "QR Code Generator",
    // "Light Dark Mode",
    "Scroll Indicator",
    // "Custom Tabs",
    // "Custom Modal",
    "Github Profile Finder",
    "Search Autocomplete",
  ];

  return (
    <>
      <div className="exp-container">
        <h2>Experimental Games:</h2>
        <ol>
          {games.map((game, index) => (
            <li key={index}>
              <Link
                to={`/${game
                  .toLowerCase()
                  .replaceAll(" ", "-")
                  .replaceAll(",", "")}`}
              >
                {game}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="exp-container">
        <h2>Experimental Projects:</h2>
        <ol>
          {projects.map((project, index) => (
            <li key={index}>
              <Link to={`/${project.toLowerCase().replaceAll(" ", "-")}`}>
                {project}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

export default Home;
