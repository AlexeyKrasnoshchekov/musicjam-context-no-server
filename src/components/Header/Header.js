import React, { useContext, useState } from "react";
// import { selectOwner } from "../Playlists/playlistsSlice";
import "./header.css";
import { FiLogOut } from "react-icons/fi";
import { context } from "../../store/context";
import { useHistory } from "react-router-dom";
// import { useAppDispatch, useAppSelector } from "../../hooks/redux";
// import { loadSearch, selectSearch } from "./searchSlice";

function Header() {
  // const dispatch = useAppDispatch();
  // const user = useAppSelector(selectOwner);
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    user,
    search,
    logout
    // searchResult
  } = useContext(context);

  // const types = ["artist", "album", "track"];

  const handleSearch = async (e) => {
    e.preventDefault();
    search(searchTerm);
    history.push("/search");
    // await dispatch(loadSearch(searchTerm));
    // const data = await search(
    //   searchTerm,
    //   types,
    //   {limit: 5, market: "RU"}
    // )
    // console.log("data", data);
  };
  const handleLogout = async () => {
    logout();
    history.push("/");
  };

  // const searchData = useAppSelector(selectSearch);
  // console.log('searchResult', searchResult);

  return (
    <div className="header">
      <form onSubmit={(e) => handleSearch(e)}>
        <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="search..." />
      </form>
      <div>App</div>
      <div className="log">
        <div className="log-title">{`Logged in as ${user}`}</div>
        <div onClick={handleLogout}>
          <FiLogOut />
        </div>
      </div>
    </div>
  );
}
export default Header;