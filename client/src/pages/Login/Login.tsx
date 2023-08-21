import React, { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=5eb951bf5718469eb4f17c4a09156d75&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public";

export const Login = () => {
  //DO NOT INCLUDE THIS IN THE FINAL VERSION. ITS JUST TO SPEED UP DEVELOPMENT
  useEffect(() => {
    let a = document.getElementById("login");
    console.log(a);
    if (a) {
      console.log(a);
      a.click();
    }
  }, []);

  return (
    <Container>
      <Title> Spotify Alternate </Title>
      <StyledButton id='login' href={AUTH_URL}>
        {" "}
        Login With Spotify{" "}
      </StyledButton>{" "}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: 40vh;
`;

const StyledButton = styled.a`
  width: 200px;
  height: 50px;
  background: ${COLORS.green};
  color: ${COLORS.white};
  cursor: pointer;
  display: inline-block;
  text-decoration: none;
  line-height: 50px;
  text-align: center;
  font-size: 18px;
`;

const Title = styled.h1``;
