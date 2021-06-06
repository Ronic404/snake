import { FC, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeCellSize, changeFieldSize } from '../redux/actions';

const DivSettings = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
`;

const Select = styled.select`
  padding: 10px;
  cursor: pointer;
  border: none;
  :active, :focus {
    outline: none;
  };
`;

const Span = styled.span`
  font-size: 1.5rem;
  color: white;
  padding-right: 5px;
`;

const Settings: FC = () => {
  const dispatch = useDispatch();

  function fieldClickHandler(e: ChangeEvent<HTMLSelectElement>) {
    dispatch(changeFieldSize(+e.target.value));
  }

  function cellClickHandler(e: ChangeEvent<HTMLSelectElement>) {
    dispatch(changeCellSize(+e.target.value));
  }

  return (
    <DivSettings>
      <Item>
        <Span>Field:</Span>
        <Select onChange={(e) => fieldClickHandler(e)} name="Field">
          <option value="400">Big</option>
          <option value="300">Middle</option>
          <option value="200">Small</option>
        </Select>
      </Item>
      <Item>
        <Span>Cell:</Span>
        <Select  onChange={(e) => cellClickHandler(e)} name="Cell">
          <option value="20">1</option>
          <option value="10">2</option>
        </Select>
      </Item>
      {/* <Item>
        <Span>Speed:</Span>
        <Select name="Speed">
          <option value="400">Slow</option>
          <option value="400">Middle</option>
          <option value="400">Fast</option>
        </Select>
      </Item> */}
    </DivSettings>
  );
}

export default Settings;