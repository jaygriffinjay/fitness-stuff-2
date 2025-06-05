import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useRef, useEffect } from 'react';

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
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const CHART_MARGIN = { left: 60, right: 60, top: 20, bottom: 30 };

const DarkenedOverlay = styled.div<{ left: number; width: number }>`
  position: absolute;
  top: ${CHART_MARGIN.top}px;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  height: calc(100% - ${CHART_MARGIN.top + CHART_MARGIN.bottom}px);
  background-color: rgba(0, 0, 0, 0.3);
  pointer-events: none;
  z-index: 1;
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
  const [selecting, setSelecting] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [currentX, setCurrentX] = useState<number | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartBounds, setChartBounds] = useState({ left: 0, width: 0 });
  const [overlayDimensions, setOverlayDimensions] = useState<{ left: number[]; width: number[] }>({ left: [], width: [] });

  useEffect(() => {
    if (chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      const chartWidth = rect.width - (CHART_MARGIN.left + CHART_MARGIN.right);
      setChartBounds({ 
        left: CHART_MARGIN.left,
        width: chartWidth
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    
    // Only start selection if click is within chart area
    if (x >= CHART_MARGIN.left && x <= rect.width - CHART_MARGIN.right) {
      setSelecting(true);
      setStartX(x - CHART_MARGIN.left);
      setCurrentX(x - CHART_MARGIN.left);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (selecting && chartRef.current) {
      const rect = chartRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      
      // Constrain movement to chart area
      const constrainedX = Math.max(
        0,
        Math.min(
          chartBounds.width,
          x - CHART_MARGIN.left
        )
      );
      
      setCurrentX(constrainedX);
    }
  };

  const handleMouseUp = () => {
    setSelecting(false);
  };

  useEffect(() => {
    if (startX !== null && currentX !== null) {
      const minX = Math.min(startX, currentX);
      const maxX = Math.max(startX, currentX);
      
      setOverlayDimensions({
        left: [0, maxX],
        width: [minX, chartBounds.width - maxX]
      });
    } else {
      setOverlayDimensions({ left: [], width: [] });
    }
  }, [startX, currentX, chartBounds.width]);

  const getSegmentStats = () => {
    if (!startX || !currentX) return null;
    
    const startPercent = (Math.min(startX, currentX) / chartBounds.width);
    const endPercent = (Math.max(startX, currentX) / chartBounds.width);
    
    const startIdx = Math.floor(startPercent * (mockData.length - 1));
    const endIdx = Math.ceil(endPercent * (mockData.length - 1));
    
    const segment = mockData.slice(startIdx, endIdx + 1);
    
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
      
      <ChartContainer
        ref={chartRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={mockData}
            margin={CHART_MARGIN}
          >
            <defs>
              <clipPath id="chartArea">
                <rect x={CHART_MARGIN.left} y={CHART_MARGIN.top} 
                      width={`calc(100% - ${CHART_MARGIN.left + CHART_MARGIN.right}px)`} 
                      height={`calc(100% - ${CHART_MARGIN.top + CHART_MARGIN.bottom}px)`} />
              </clipPath>
            </defs>
            {overlayDimensions.left.map((left, i) => (
              <rect
                key={i}
                x={left + CHART_MARGIN.left}
                y={CHART_MARGIN.top}
                width={overlayDimensions.width[i]}
                height={`calc(100% - ${CHART_MARGIN.top + CHART_MARGIN.bottom}px)`}
                fill="rgba(0, 0, 0, 0.3)"
                clipPath="url(#chartArea)"
              />
            ))}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="pace" domain={[5, 13]} />
            <YAxis yAxisId="hr" orientation="right" domain={[80, 190]} />
            <Tooltip />
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