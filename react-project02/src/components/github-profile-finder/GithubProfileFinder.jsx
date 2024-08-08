import { useEffect, useState } from "react";
import User from "./User";
import "./styles.scss";

function GithubProfileFinder() {
  const [userName, setUserName] = useState(null);
  const [inputValue, setInputValue] = useState("arlanviray"); // initial value
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const getData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.github.com/users/${inputValue}`
      );
      const data = await response.json();

      if (data.status) {
        setUserName("");
        setErrMessage("User Not Found !!!");
      } else {
        setUserName(data);
        setErrMessage("");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setErrMessage("An error occurred while fetching data...");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(userName);

  return (
    <div className="github-profile-finder maxwidth mwmedium">
      <div className="fields">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search Github Username..."
        />
        <button
          onClick={handleSubmit}
          disabled={inputValue && inputValue.trim() !== "" ? false : true}
        >
          Search Now!
        </button>
      </div>

      {(() => {
        if (errMessage) {
          return <div className="center">{errMessage}</div>;
        } else {
          return loading ? (
            <div className="center">Loading...</div>
          ) : (
            userName && <User userData={userName} />
          );
        }
      })()}
    </div>
  );
}

export default GithubProfileFinder;
