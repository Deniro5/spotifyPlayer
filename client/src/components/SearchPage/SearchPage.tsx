import React from "react";
import { useAppSelector } from "../../hooks";
import useFetchSearchSongs from "../../hooks/useFetchSearchSongs";
import TrackList from "../TrackList";

const SearchPage = () => {
  const {
    isFetchingInitial,
    loadMoreTracks,
    errorMessage,
    noResults,
    noSearchTermEntered,
  } = useFetchSearchSongs();

  const getDisplayComponent = () => {
    if (noSearchTermEntered) {
      return <div> No search Term entered </div>;
    } else if (noResults) {
      return <div> No results </div>;
    } else {
      return <TrackList isUserTracks={false} loadMoreTracks={loadMoreTracks} />;
    }
  };

  const componentToReturn = getDisplayComponent();

  return componentToReturn;
};

export { SearchPage };
