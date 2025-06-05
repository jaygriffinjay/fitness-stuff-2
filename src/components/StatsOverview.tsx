import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

const mockData = [
  { date: 'Mon', distance: 5.2 },
  { date: 'Tue', distance: 3.8 },
  { date: 'Wed', distance: 6.1 },
  { date: 'Thu', distance: 4.5 },
  { date: 'Fri', distance: 7.2 },
  { date: 'Sat', distance: 8.4 },
  { date: 'Sun', distance: 4.9 },
];

export function StatsOverview() {
  return (
    <Container>
      <Title>Weekly Overview</Title>
      <StatsGrid>
        <StatCard>
          <StatValue>40.1km</StatValue>
          <StatLabel>Total Distance</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>5:30/km</StatValue>
          <StatLabel>Average Pace</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>6h 20m</StatValue>
          <StatLabel>Total Time</StatLabel>
        </StatCard>
      </StatsGrid>
      
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="distance" 
              stroke="#2563eb" 
              fill="#93c5fd" 
              fillOpacity={0.3} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
}