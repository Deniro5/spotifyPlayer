import React from "react";
import { TrackListHeader } from "./TrackListHeader";
import LikedSongsAlbumImg from "../../assets/likedsongsalbum.png";

const LikedSongsHeader = () => {
  return (
    <>
      <TrackListHeader
        name={"Liked Songs"}
        trackCount={"0"}
        imgSrc={LikedSongsAlbumImg}
      />
    </>
  );
};

export { LikedSongsHeader };
