import { Link } from "react-router-dom";

function Home() {
  const pages = [
    "Accordion",
    "Random Color",
    "Star Rating",
    "Image Slider",
    "Loadmore Data",
    "Tree View",
    "QR Code Generator",
    "Light Dark Mode",
    "Scroll Indicator",
    "Custom Tabs",
  ];

  return (
    <>
      <h2>Experimental Projects:</h2>
      <ol>
        {pages.map((page, index) => (
          <li key={index}>
            <Link to={`/${page.toLowerCase().replaceAll(" ", "-")}`}>
              {page}
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}

export default Home;
