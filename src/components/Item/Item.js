export default function Item(props) {
  console.log("images", props.images);

//   useEffect(() => {
//     props.images.length !== 0 &&
//       props.images.map((image) =>
//         setImages((oldArray) => [...oldArray, image])
//       );
//   }, []);

  return (
    
    <div>
      {props.images.length !== 0 && (
        <div
          // key={index}
          style={{
            display: "flex",
            width: "200px",
            height: "200px",
            outline: "2px solid red",
            backgroundImage: `url(${props.images[1].url})`,
          }}
          alt="main logo"
        ></div>
      )}
      
      {props.artist && <div>{props.artist}</div>}
      {props.name && <div>{props.name}</div>}
      {props.releaseDate && <div>{props.releaseDate}</div>}
      {props.tracksTotal && <div>{props.tracksTotal}</div>}
      {props.popularity && <div>{props.popularity}</div>}
      {props.genre && <div>{props.genre}</div>}
      {props.album && <div>{props.album}</div>}
    </div>
  );
}
