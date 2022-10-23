import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearch } from "../../redux/slices/playerSlice";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

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
      <SearchInput
        onChange={(e) => handleChange(e)}
        value={value}
        placeholder='Search for Songs, Artists Etc...'
      />
      <SearchIconContainer>
        <SearchIcon height={16} width={16} />
      </SearchIconContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  height: 45px;
  border-radius: 40px;
  width 78%;
  max-width: 400px;
  border: 1px solid ${COLORS.lightGrey};
  position: relative;
  background: white;
  padding-left: 40px;
  outline: none;
  &:focus {
    border: 1px solid ${COLORS.primary};
  }
`;

const SearchIconContainer = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 4px;
  top: 5px;
`;

export { SearchBar };
