import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../hooks";
import SearchIcon from "../../assets/search.svg?react";
import { setSearch } from "../../redux/slices/AppSlice/appSlice";
import { debounce } from "lodash";
import { getSearch } from "../../redux/selectors";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector(getSearch);
  const [value, setValue] = useState<string>(search);
  const searchRef = useRef("");

  //Use this to get the current value within the setTimeout
  useEffect(() => {
    searchRef.current = value;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedUpdateSearch();
  };

  const debouncedUpdateSearch = debounce(() => {
    dispatch(setSearch(searchRef.current));
  }, 500);

  return (
    <SearchRowContainer>
      <Container>
        <SearchInput
          onChange={(e) => handleChange(e)}
          value={value}
          placeholder="Search for Songs, Artists Etc..."
        />
        <SearchIconContainer>
          <SearchIcon height={16} width={16} />
        </SearchIconContainer>
      </Container>
    </SearchRowContainer>
  );
};

const SearchRowContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 21px;
  padding-left: 30px;
`;

const Container = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  height: 45px;
  border-radius: 40px;
  width 78%;
  width: 400px;
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
