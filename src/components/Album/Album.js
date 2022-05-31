import "./album.css";

function Album({name, tracksTotal, releaseDate, artist}) {
  return (
    <div className="albumContainer">
      <div>{artist}</div>
      <div>{name}</div>
      <div>{releaseDate}</div>
      <div>{tracksTotal}</div>
    </div>
  );
}

export default Album;
