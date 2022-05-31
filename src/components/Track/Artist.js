import "./Track.css";

function Track({date, artist, track, album, releaseDate}) {
  return (
    <div className="trackContainer">
      <div>{date}</div>
      <div>{artist}</div>
      <div>{track}</div>
      <div>{album}</div>
      <div>{releaseDate}</div>
    </div>
  );
}

export default Track;
