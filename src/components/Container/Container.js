import Header from "../Header/Header";
import "./container.css";
import Playlists from "../Playlists/Playlists";

export default function Container(props) {

  return (
    <div className="home">
      <Header />
      <div style={{ display: "flex", minHeight: '94%', color: 'lightcyan' }}>
        <div className="sidebar">
          <Playlists />
        </div>
        <main id="main" style={{width: '100%', paddingTop: '2rem', paddingBottom: '2rem', paddingLeft: '2rem'}}>{props.children}</main>
      </div>
    </div>
  );
}
