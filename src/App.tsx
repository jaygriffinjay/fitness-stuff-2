import styled from 'styled-components';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { RecentRuns } from './components/RecentRuns';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <StatsOverview />
        <RecentRuns />
      </MainContent>
    </AppContainer>
  );
}

export default App;