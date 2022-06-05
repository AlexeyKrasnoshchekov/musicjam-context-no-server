import { useContext, useState } from "react";
import "./header.css";
import { FiLogOut } from "react-icons/fi";
import { context } from "../../context/context";
import { useHistory } from "react-router-dom";

function Header1() {

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

  };
  const handleLogout = async () => {
    logout();
    history.push("/");
  };


  return (
    <div className="header">
      {/* <form onSubmit={(e) => handleSearch(e)}>
        <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="search..." />
      </form> */}
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
export default Header1;