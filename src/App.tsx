import styled from 'styled-components';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { RecentRuns } from './components/RecentRuns';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f3f4f6;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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