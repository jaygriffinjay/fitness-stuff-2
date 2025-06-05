import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { useState } from 'react';

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

const SegmentStats = styled.div`
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const ChartContainer = styled.div`
  height: 300px;
  position: relative;
  user-select: none;
`;

const mockData = [
  { time: '0:00', pace: 12.0, hr: 90 }, // Walking
  { time: '5:00', pace: 11.5, hr: 95 },
  { time: '10:00', pace: 8.0, hr: 150 }, // Started running
  { time: '15:00', pace: 7.5, hr: 165 },
  { time: '20:00', pace: 7.2, hr: 170 },
  { time: '25:00', pace: 9.5, hr: 140 }, // Slowed down
  { time: '30:00', pace: 9.0, hr: 135 },
  { time: '35:00', pace: 6.5, hr: 180 }, // Final sprint
  { time: '40:00', pace: 6.8, hr: 185 },
];

export function StatsOverview() {
  const [startIndex, setStartIndex] = useState<number | null>(null);
  const [endIndex, setEndIndex] = useState<number | null>(null);

  const handleMouseDown = (e: any) => {
    if (e.activeLabel) {
      setStartIndex(mockData.findIndex(d => d.time === e.activeLabel));
      setEndIndex(null);
    }
  };

  const handleMouseMove = (e: any) => {
    if (startIndex !== null && e.activeLabel) {
      setEndIndex(mockData.findIndex(d => d.time === e.activeLabel));
    }
  };

  const handleMouseUp = () => {
    if (startIndex === endIndex) {
      setStartIndex(null);
      setEndIndex(null);
    }
  };

  const getSegmentStats = () => {
    if (startIndex === null || endIndex === null) return null;
    
    const start = Math.min(startIndex, endIndex);
    const end = Math.max(startIndex, endIndex);
    const segment = mockData.slice(start, end + 1);
    
    const avgPace = segment.reduce((sum, point) => sum + point.pace, 0) / segment.length;
    const avgHR = segment.reduce((sum, point) => sum + point.hr, 0) / segment.length;
    
    return {
      startTime: segment[0].time,
      endTime: segment[segment.length - 1].time,
      avgPace: avgPace.toFixed(1),
      avgHR: Math.round(avgHR),
    };
  };

  const segmentStats = getSegmentStats();

  return (
    <Container>
      <Title>Run Analysis</Title>
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
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={{ top: 20, right: 60, bottom: 30, left: 60 }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="pace" domain={[5, 13]} />
            <YAxis yAxisId="hr" orientation="right" domain={[80, 190]} />
            <Tooltip />
            {startIndex !== null && endIndex !== null && (
              <>
                <ReferenceArea
                  x={mockData[0].time}
                  x2={mockData[Math.min(startIndex, endIndex)].time}
                  y1={5}
                  y2={13}
                  yAxisId="pace"
                  fill="#000"
                  fillOpacity={0.3}
                />
                <ReferenceArea
                  x={mockData[Math.max(startIndex, endIndex)].time}
                  x2={mockData[mockData.length - 1].time}
                  y1={5}
                  y2={13}
                  yAxisId="pace"
                  fill="#000"
                  fillOpacity={0.3}
                />
              </>
            )}
            <Area 
              yAxisId="pace"
              type="monotone" 
              dataKey="pace" 
              stroke="#2563eb" 
              fill="#93c5fd" 
              fillOpacity={0.3} 
              name="Pace (min/km)"
            />
            <Area 
              yAxisId="hr"
              type="monotone" 
              dataKey="hr" 
              stroke="#dc2626" 
              fill="#fca5a5" 
              fillOpacity={0.3}
              name="Heart Rate"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>

      {segmentStats && (
        <SegmentStats>
          <Title>Selected Segment Analysis</Title>
          <StatsGrid>
            <StatCard>
              <StatValue>{segmentStats.startTime} - {segmentStats.endTime}</StatValue>
              <StatLabel>Time Range</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{segmentStats.avgPace} min/km</StatValue>
              <StatLabel>Average Pace</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>{segmentStats.avgHR} bpm</StatValue>
              <StatLabel>Average Heart Rate</StatLabel>
            </StatCard>
          </StatsGrid>
        </SegmentStats>
      )}
    </Container>
  );
}