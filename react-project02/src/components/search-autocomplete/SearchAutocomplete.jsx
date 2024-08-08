import { useEffect, useState } from "react";
import Suggestions from "./Suggestions";
import SelectedUser from "./SelectedUser";
import "./styles.scss";

function SearchAutocomplete({ url }) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleOnChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchParam(query);

    if (query.length > 1) {
      setFilteredUsers(
        users && users.length
          ? users.filter(
              ({ firstName, lastName }) =>
                firstName.toLowerCase().includes(query) ||
                lastName.toLowerCase().includes(query)
            )
          : []
      );
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const handleClick = (e) => {
    // console.log(e.target.dataset.id);
    setSelectedUser(
      users.filter((user) => user.id === Number(e.target.dataset.id))
    );

    setSearchParam(e.target.innerText);
    setFilteredUsers([]);
    setShowSearch(false);
  };

  const getData = async () => {
    try {
      setLoading(true);

      const response = await fetch(url);
      const data = await response.json();

      if (data && data.users && data.users.length) {
        setUsers(
          data.users.map(({ id, firstName, lastName, image, age, gender }) => ({
            id,
            firstName,
            lastName,
            image,
            age,
            gender,
          }))
        );
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
  }, []);

  // console.log(users, filteredUsers);
  // console.log("selectedUser:", selectedUser);

  return (
    <div className="search-autocomplete maxwidth mwsmall">
      {(() => {
        if (errMessage) {
          return <div className="center">{errMessage}</div>;
        } else {
          return loading ? (
            <div className="center">Loading...</div>
          ) : (
            <>
              <input
                type="text"
                value={searchParam}
                onChange={handleOnChange}
                placeholder="Search Users..."
              />
              {showSearch && (
                <Suggestions data={filteredUsers} handleClick={handleClick} />
              )}
              {selectedUser && <SelectedUser data={selectedUser} />}
            </>
          );
        }
      })()}
    </div>
  );
}

export default SearchAutocomplete;
