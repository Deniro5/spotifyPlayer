import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../../hooks";

const UserInfo = ({}) => {
  const currentUser = useAppSelector((state) => state.player.currentUser);

  return (
    <Container>
      <ProfileImage src={currentUser?.images[0]?.url} />
      <UserName> {currentUser?.display_name} </UserName>
      <Email> {currentUser?.email} </Email>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: 15px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 90px;
`;

const UserName = styled.h2`
  margin: 0;
  font-weight: 800;
  color: black;
  font-size: 14px;
`;

const Email = styled.h3`
  font-weight: 400;
  color: grey;
  font-size: 10px;
  margin-top: 4px;
`;

export { UserInfo };
