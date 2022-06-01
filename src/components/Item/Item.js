import "./item.css";

export default function Item(props) {
  // console.log("images", props.images);

  //   useEffect(() => {
  //     props.images.length !== 0 &&
  //       props.images.map((image) =>
  //         setImages((oldArray) => [...oldArray, image])
  //       );
  //   }, []);



  return (
    <div onClick={() => props.albumId && props.getAlbum(props.albumId)}>
      {props.images.length !== 0 && (
        <div
          // key={index}
          style={{
            backgroundImage: `url(${props.images[1].url})`,
          }}
          className="item-container"
          alt="main logo"
        >
          <div className="item-inner-container">
            <div>
              {props.artist && <div>{`Artist: ${props.artist}`}</div>}
              {props.name && <div>{`Name: ${props.name}`}</div>}
              {props.releaseDate && (
                <div>{`Realesed: ${props.releaseDate}`}</div>
              )}
              {props.tracksTotal && <div>{`${props.tracksTotal} tracks`}</div>}
              {props.popularity && (
                <div>{`Popularity: ${props.popularity}`}</div>
              )}
              {props.genre && <div>{`Genre: ${props.genre}`}</div>}
              {props.duration_ms && <div>{props.duration_ms}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
