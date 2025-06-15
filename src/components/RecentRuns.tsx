import styled from 'styled-components';

const Container = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 1rem 0;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const RunList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RunCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  align-items: center;
  padding: 1rem;
  background: #f3f4f6;
  border-radius: 8px;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
    text-align: center;
  }
`;

const RunDate = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
`;

const RunStats = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    gap: 0.5rem;
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StatValue = styled.div`
  font-weight: bold;
  color: #2563eb;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.75rem;
`;

const MapPlaceholder = styled.div`
  background: #e5e7eb;
  border-radius: 4px;
  height: 60px;
  width: 100%;
`;

export function RecentRuns() {
  return (
    <Container>
      <Title>Recent Runs</Title>
      <RunList>
        {[1, 2, 3].map((i) => (
          <RunCard key={i}>
            <RunDate>Mar {i}, 2025</RunDate>
            <RunStats>
              <StatItem>
                <StatValue>5.2km</StatValue>
                <StatLabel>Distance</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>5:30/km</StatValue>
                <StatLabel>Pace</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>28:36</StatValue>
                <StatLabel>Time</StatLabel>
              </StatItem>
            </RunStats>
            <MapPlaceholder />
          </RunCard>
        ))}
      </RunList>
    </Container>
  );
}