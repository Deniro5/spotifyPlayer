import { useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import Button from "../../components/Common/Button";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=5eb951bf5718469eb4f17c4a09156d75&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20playlist-modify-private%20playlist-modify-public%20user-read-recently-played";

const Login = () => {
  //DO NOT INCLUDE THIS IN THE FINAL VERSION. ITS JUST TO SPEED UP DEVELOPMENT
  useEffect(() => {
    // let a = document.getElementById("login");
    // console.log(a);
    // if (a) {
    //   console.log(a);
    //   a.click();
    // }
  }, []);

  return (
    <Container>
      <LoginCardContainer>
        <LoginCard>
          <Title>Spotify Coding Project</Title>
          <Description>
            Welcome to my Spotify Coding Project! This project is built using
            React, Typescript, Redux Toolkit, Styled Components, and various
            other libraries. Feel free to log in to your Spotify account using
            the button below to give it a try, or click the link below the
            button to watch a demo. The project source is available on GitHub{" "}
            <StyledLink href={"https://github.com/Deniro5/spotifyPlayer"}>
              here
            </StyledLink>
          </Description>
          <LoginButtonContainer>
            <a href={AUTH_URL}>
              <Button width={110} height={36} hoverColor={COLORS.darkPrimary}>
                Login
              </Button>
            </a>
            <DemoLink href={"www.google.ca"}> Watch demo video here</DemoLink>
          </LoginButtonContainer>
        </LoginCard>
      </LoginCardContainer>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  height: 100vh;
  width: 100%;
  background: linear-gradient(
    109.6deg,
    ${COLORS.darkPrimary} 50.2%,
    ${COLORS.lightPrimary} 91.1%
  );
`;

const LoginCardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Set the height of the container to 100% of the viewport height */
`;

const LoginCard = styled.div`
  max-width: 320px;
  padding: 24px 32px;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  color: #333333;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 8px;
  border-bottom: 1px solid ${COLORS.darkPrimary};
`;

const Description = styled.p`
  font-size: 16px;
  margin: 24px 0;
  color: ${COLORS.font};
  line-height: 24px;
  text-align: center;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  a {
    text-decoration: none;
  }
`;

const StyledLink = styled.a`
  color: ${COLORS.primary};
`;

const DemoLink = styled(StyledLink)`
  font-size: 12px;
  margin-top: 8px;
`;

export default Login;
