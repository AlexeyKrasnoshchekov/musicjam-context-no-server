import "./artist.css";

function Artist({name, genre, popularity}) {
  return (
    <div className="artistContainer">
      <div>{name}</div>
      <div>{genre}</div>
      <div>{popularity}</div>
    </div>
  );
}

export default Artist;
