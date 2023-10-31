import React from "react";
import useFetchSearchSongs from "../../hooks/useFetchSearchSongs";
import TrackList from "../TrackList";
import styled from "styled-components";
import EmptySearch from "./EmptySearch";
import Placeholder from "./Placeholder";

const SearchPage = () => {
  const { isFetchingInitial, loadMoreTracks, noResults, noSearchTermEntered } =
    useFetchSearchSongs();

  const getDisplayComponent = () => {
    if (noSearchTermEntered) {
      return <Placeholder />;
    } else if (noResults) {
      return <EmptySearch />;
    } else {
      return (
        <TrackList
          isLoading={isFetchingInitial}
          isUserTracks={false}
          loadMoreTracks={loadMoreTracks}
        />
      );
    }
  };

  const componentToReturn = getDisplayComponent();

  return componentToReturn;
};

export { SearchPage };
