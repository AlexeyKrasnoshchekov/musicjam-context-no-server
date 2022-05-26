import { useContext, useEffect, useRef } from "react";
import { context } from "../../store/context";
import { Link, useHistory } from "react-router-dom";

export default function Login() {
  const { token, auth, getToken } = useContext(context);

  const initialRender = useRef(true);
  let history = useHistory();

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    token === "" && getToken();
  }, []);

  const handleLogin = () => {
    
    
    token !== "" && auth();
    history.push('/home');
  };

  return (
    <div>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify-Logo"
      />
      {/* <Link style={{ color: "lightcyan" }} to={`/home`}> */}
        <button onClick={handleLogin}>LOGIN WITH SPOTIFY</button>
      {/* </Link> */}
    </div>
  );
}
