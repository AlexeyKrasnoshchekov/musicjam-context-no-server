import "./Track.css";

function Track({ date, artist, track, album, releaseDate, duration, trackNumber, albumId, getAlbum }) {

  let duration_min = Math.floor(duration / 60);
  let duration_sec = Math.round(duration % 60);

  // console.log('trackNumber', trackNumber)

  return (
    <div className="track-container">
      <div className="track-song">
        {artist && track && <div>{`${artist} - ${track}`}</div>}
        {!artist && track && <div>{`${trackNumber}. ${track}`}</div>}
        {/* <div>{track}</div> */}
      </div>
      <div className="track-info">
        {album && <div onClick={() => getAlbum(albumId)}>{`Album: ${album}`}</div>}
        {releaseDate && <div>{`Realesed: ${releaseDate}`}</div>}
        {duration && <div>{`Duration: ${duration_min}:${duration_sec}`}</div>}
      </div>
    </div>
  );
}

export default Track;
