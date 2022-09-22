import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearch } from "../../redux/slices/playerSlice";

export type ISearchBarProps = {};

const SearchBar: React.FC<ISearchBarProps> = ({}) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.player.search);
  const [value, setValue] = useState<string>(search);
  const [typing, setTyping] = useState(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const searchRef = useRef("");

  //Use this to get the current value within the setTimeout
  useEffect(() => {
    searchRef.current = value;
  }, [value]);

  useEffect(() => {
    if (typing) {
      const timeOut = setTimeout(() => {
        setTyping(false);
        dispatch(setSearch(searchRef.current));
      }, 500);
      setTypingTimer(timeOut);
    }

    //add clear timeOut here. Find out why TS doesnt want us to do this
  }, [typing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!typing) {
      setTyping(true);
    }
  };

  return (
    <Container>
      {/* <SearchIcon src={Default} /> */}
      <SearchInput
        onChange={(e) => handleChange(e)}
        value={value}
        placeholder='Search for Songs, Artists Etc...'
      />
    </Container>
  );
};

const Container = styled.div`
  height: 45px;
  border-radius: 40px;
  width: 400px;
  border: 1px solid lightgrey;
  position: relative;
  background: white;
`;

const SearchIcon = styled.img`
  position: absolute;
  height: 40px;
  width: 40px;
`;

const SearchInput = styled.input`
  border: none;
  margin-left: 40px;
  height: 43px;
  width: 317px;
  background: none;
  outline: none;
`;

export { SearchBar };
