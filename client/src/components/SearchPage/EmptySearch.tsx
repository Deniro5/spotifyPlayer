import { useAppSelector } from "../../hooks";
import { getSearch } from "../../redux/selectors";
import styled from "styled-components";

const EmptySearch = () => {
  const search = useAppSelector(getSearch);
  return (
    <Text>
      No results found for '{search}'. <br /> Please try another search term.
    </Text>
  );
};

const Text = styled.p`
  margin: 20px auto;
  font-weight: 500;
  text-align: center;
  line-height: 30px;
`;

export default EmptySearch;
