import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { changeDirection, changeSnake } from '../redux/actions';
import { IState } from '../redux/reducer';

const DivStartStop = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  :active, :focus {
    outline: none;
  };
  :active {
    background: #dddddd;
  };
`;

const StartStop: FC = () => {
  const { initialSnake } = useSelector((state: IState) => state);
  const dispatch = useDispatch();

  function startHandler(): void {
    dispatch(changeDirection('right'));
  }

  function stopHandler(): void {
    dispatch(changeDirection(null)); 
    dispatch(changeSnake(initialSnake));
  }

  return (
    <DivStartStop>
      <Button onClick={startHandler}>Start</Button>
      <Button onClick={stopHandler}>Stop</Button>
    </DivStartStop>
  );
}

export default StartStop;