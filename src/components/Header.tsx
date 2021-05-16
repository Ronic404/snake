import { FC } from 'react';
import styled from 'styled-components';

const DivHeader = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
`;

const Header: FC = () => {
  return (
    <DivHeader>
      <Title>Snake</Title>
    </DivHeader>
  );
}

export default Header;