import { useEffect, useState } from "react";
import "./styles.scss";

function ScrollIndicator({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data && data.products) {
        setData(data.products);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrMessage("An error occurred while fetching data...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  // console.log(data);

  // initiate ONCE only with added empty array
  useEffect(() => {
    window.addEventListener("scroll", () => {
      // set sticky indicator
      const elHeader = document.querySelector("header");
      const elIndicator = document.querySelector(
        ".scroll-indicator .indicator"
      );
      if (window.scrollY > elHeader.offsetHeight) {
        elIndicator.classList.add("sticky");
      } else {
        elIndicator.classList.remove("sticky");
      }

      // set scroll percentage
      const pixelScrolled = window.scrollY;
      const totalHeightScrollable = document.body.scrollHeight;
      const viewportHeight = window.innerHeight;
      setScrollPercentage(
        (pixelScrolled / (totalHeightScrollable - viewportHeight)) * 100
      );
    });
  }, []);

  return (
    <div className="scroll-indicator">
      {loading && <div className="center">Loading...</div>}
      {errMessage && <div className="center">{errMessage}</div>}

      {data.length > 0 && (
        <>
          <div className="indicator">
            <div
              className="progressbar"
              style={{ width: `${Math.round(scrollPercentage)}%` }}
            >
              <span>{`${Math.round(scrollPercentage)}%`}</span>
            </div>
          </div>
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ScrollIndicator;
