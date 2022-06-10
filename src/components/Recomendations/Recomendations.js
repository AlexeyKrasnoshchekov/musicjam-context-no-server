import { Card, Typography } from "antd";
import React, { useContext, useEffect, useRef } from "react";
import { context } from "../../context/context";

export default function MyTops() {
  const { Title } = Typography;
  const { getCategories, categories, myTopArtists } =
    useContext(context);
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    getCategories();
    // getMyTopTracks();
  }, []);

  // const handleCatClick = async (id) => {
  //   await getCategory(id);
  // }

  return (
    <div>
      {categories && (
        <div>
          {/* <div>albums</div> */}
          <Title level={4}>Categories</Title>
          <div className="albums-grid">
            {categories.length !== 0 &&
              categories.map((cat, index) => {
                return (
                  <Card
                    hoverable
                    title={cat.name}
                    // extra={
                    //   <a
                    //     href="#"
                    //     onClick={() => {
                    //       handleGetAlbum(album.id);
                    //     }}
                    //   >
                    //     More
                    //   </a>
                    // }
                    // cover={<img alt="example" src={`${cat.icons[0].url}`} />}
                    style={{
                      width: 200,
                      height: 200,
                      backgroundImage: `url(${cat.icons[0].url})`,
                      cursor: 'pointer',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                    }}
                    bodyStyle={{
                      color: "lightgray",
                      height: "calc(100% - 3rem",
                      // backgroundColor: "rgba(000, 000, 000, 0.5)",
                    }}
                    headStyle={{
                      color: "lightgray",
                      height: "3rem",
                      textAlign:'center',
                      border: 'none'
                      // backgroundColor: "rgba(000, 000, 000, 0.5)",
                    }}
                  >
                    {/* <p>{`Artist: ${album.artists[0].name}`}</p>
                    <p>{`Released: ${album.release_date}`}</p>
                    <p>{`Total tracks: ${album.total_tracks}`}</p> */}
                    {/* {mySavedAlbums.filter(
                      (savedAlbum) => savedAlbum.album.id === album.id
                    ).length === 0 && (
                      <Button
                        onClick={() => {
                          handleAddToMyAlbums(album.id);
                        }}
                      >
                        Save
                      </Button>
                    )} */}
                  </Card>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
