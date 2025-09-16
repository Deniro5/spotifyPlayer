import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Player from "../../components/Player";
import SpotifyWebApi from "spotify-web-api-node";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Router from "../../components/Router";
import { setAccessToken } from "../../redux/slices/PlayerSlice/playerSlice";
import {
  getIsRecommendationsView,
  getShowRecommendations,
} from "../../redux/slices/AppSlice/selectors";
import Toast from "../../components/Toast";
import Recommendations from "../../components/TrackList/Recommendations";
import Queue from "../../components/TrackList/Queue";

interface HomeProps {
  code: string;
}

const spotifyApi = new SpotifyWebApi({
  clientId: "8b945ef10ea24755b83ac50cede405a0",
});

const Home = ({ code }: HomeProps) => {
  const accessToken = useAuth(code);
  const dispatch = useAppDispatch();
  const showRecommendations = useAppSelector(getShowRecommendations);
  const isRecommendationsView = useAppSelector(getIsRecommendationsView);

  useEffect(() => {
    if (!accessToken) return;

    spotifyApi.setAccessToken(accessToken);
    dispatch(setAccessToken(accessToken));
  }, [dispatch, accessToken]);

  return (
    <Container>
      <Sidebar />
      <Main>
        <Header />
        <Body>
          <ViewContainer>
            <Router />
            {showRecommendations && isRecommendationsView && (
              <RightSidebar>
                {/* <Recommendations /> Deprecated by spotify as of late 2024 */}
                <Queue />
              </RightSidebar>
            )}
          </ViewContainer>
        </Body>
        <PlayerContainer>
          <Player accessToken={accessToken} />
        </PlayerContainer>
      </Main>
      <Toast />
    </Container>
  );
};

const Container = styled.div``;

const Main = styled.div`
  padding-left: 250px;
  overflow: hidden;
`;

const RightSidebar = styled.div`
  @media (max-width: 1135px) {
    display: none; // or any other display value you prefer for smaller screens
  }
  display: flex;
  flex-direction: column;
`;

//171px is the height of the header + div
const Body = styled.div`
  display: flex;
  overflow-x: hidden;
  height: calc(100vh - 171px);
`;

const ViewContainer = styled.div`
  width: 100%;
  display: flex;
`;

const PlayerContainer = styled.div`
  width: 100%;
`;

export default Home;
