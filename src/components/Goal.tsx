import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { IState } from '../redux/reducer';

const DivGoal = styled.div`
  font-size: 2em;
  text-align: center;
  margin-bottom: 1em;
`;

const ParagraphGoal = styled.p`
`;

const Goal: FC = () => {
  const { factCheck: fact, planCheck: plan } = useSelector((state: IState) => state);

  return (
    <DivGoal>
      <ParagraphGoal>Плановый средний чек: {plan}</ParagraphGoal>
      <ParagraphGoal>Фактический средний чек: {fact}</ParagraphGoal>
      <ParagraphGoal> - увеличене среднего чека</ParagraphGoal>
    </DivGoal>
  )
}

export default Goal;