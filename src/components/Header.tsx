import styled from 'styled-components';

const HeaderContainer = styled.header`
  background: linear-gradient(to right, #2563eb, #1d4ed8);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

export function Header() {
  return (
    <HeaderContainer>
      <Title>Fitness Stuff 2</Title>
    </HeaderContainer>
  );
}