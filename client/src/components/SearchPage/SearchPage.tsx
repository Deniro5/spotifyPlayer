import React from "react";
import useFetchSearchSongs from "../../hooks/useFetchSearchSongs";
import TrackList from "../TrackList";
import styled from "styled-components";

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
      return <Message> Enter a search term above </Message>;
    } else if (noResults) {
      return <Message> No results </Message>;
    } else {
      return <TrackList isUserTracks={false} loadMoreTracks={loadMoreTracks} />;
    }
  };

  const componentToReturn = getDisplayComponent();

  return componentToReturn;
};

const Message = styled.div`
  font-size: 14px;
`;

export { SearchPage };
