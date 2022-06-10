// import React from "react";

// export default function TrackList() {
//   const [data, setData] = useState([]);

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Artist",
//       key: "artist",
//       dataIndex: "artist",
//       // render: (text) => <a href="#" onClick={() => {handleArtistSearch(text)}}>{text}</a>,
//     },
//     {
//       title: "Added",
//       dataIndex: "added",
//       key: "added",
//     },
//     {
//       title: "Album",
//       dataIndex: "album",
//       key: "album",
//       render: (text) => <a>{text}</a>,
//       onCell: (record, rowIndex) => {
//         return {
//           onClick: (event) => {
//             handleGetAlbum(record);
//           }, // click row
//         };
//       },
//     },
//     {
//       title: "Released",
//       dataIndex: "released",
//       key: "released",
//     },

//     {
//       title: "Duration",
//       dataIndex: "duration",
//       key: "duration",
//     },
//     {
//       title: "Del",
//       key: "del",
//       render: () => <b>Del</b>,
//       onCell: (record, rowIndex) => {
//         return {
//           onClick: (event) => {
//             handleSavedTrackDelete(rowIndex);
//           }, // click row
//         };
//       },
//     },
//   ];

//   const formatData = () => {
//     // let dataArr = [];
//     mySavedTracks.length !== 0 &&
//       mySavedTracks.forEach((item) => {
//         setData1(
//           item.added_at.split("T")[0],
//           item.track.name,
//           item.track.artists[0].name,
//           item.track.album.name,
//           item.track.album.release_date,
//           item.track.duration_ms / 1000
//         );
//       });
//   };

//   const setData1 = (added, name, artist, album, released, duration) => {
//     let obj = {
//       added: "",
//       name: "",
//       artist: "",
//       album: "",
//       released: "",
//       duration: "",
//     };

//     let duration_min = Math.floor(duration / 60);
//     let duration_sec = Math.round(duration % 60);

//     obj.added = added;
//     obj.name = name;
//     obj.artist = artist;
//     obj.album = album;
//     obj.released = released;
//     obj.duration = `${duration_min}:${duration_sec}`;
//     // setData([]);
//     setData((data) => [...data, obj]);
//   };

//   return <div>TrackList</div>;
// }
