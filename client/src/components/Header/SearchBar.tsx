import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ReactComponent as SettingIcon } from "../../assets/setting.svg";
import { SettingsModal } from "./SettingsModal";
import { setSearch } from "../../redux/slices/playerSlice";
import { debounce } from "lodash";

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.player.search);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
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

  const handleOpenSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <SearchRowContainer>
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
      <SettingIconContainer onClick={handleOpenSettingsModal}>
        <SettingIcon height={20} width={20} />
      </SettingIconContainer>
      {isSettingsModalOpen && (
        <SettingsModal isOpen handleCloseSettingsModal={handleCloseSettingsModal} />
      )}
    </SearchRowContainer>
  );
};

const SearchRowContainer = styled.div`
  display: flex;
  align-items: center;
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

const SettingIconContainer = styled.div`
  margin-left: 10px;
  cursor: pointer;
  path {
    fill: ${COLORS.black};
  }
  &:hover {
    path {
      fill: ${COLORS.primary};
    }
  }
`;

export { SearchBar };
