import styled from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { useState, useCallback, useMemo, useRef, memo } from 'react';
import React from 'react';

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
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
  width: 100%;
  overflow: hidden;
`;

const mockData = [
  { index: 0, time: '0:00', pace: 12.0, hr: 90 }, // Walking
  { index: 1, time: '5:00', pace: 11.5, hr: 95 },
  { index: 2, time: '10:00', pace: 8.0, hr: 150 }, // Started running
  { index: 3, time: '15:00', pace: 7.5, hr: 165 },
  { index: 4, time: '20:00', pace: 7.2, hr: 170 },
  { index: 5, time: '25:00', pace: 9.5, hr: 140 }, // Slowed down
  { index: 6, time: '30:00', pace: 9.0, hr: 135 },
  { index: 7, time: '35:00', pace: 6.5, hr: 180 }, // Final sprint
  { index: 8, time: '40:00', pace: 6.8, hr: 185 },
];

const chartMargin = { top: 20, right: 30, bottom: 30, left: 30 };

// Global ref to communicate between chart and parent without props
let globalSelectionCallback: ((selection: { start: number | null; end: number | null }) => void) | null = null;

// Completely static chart component - zero props, never re-renders
const StaticChart = memo(() => {
  console.log('🔄 Chart component re-rendering');
  
  const selectionRef = useRef<{ start: number | null; end: number | null }>({ start: null, end: null });
  const [, forceUpdate] = useState({});
  
  const handlers = useMemo(() => ({
    onMouseDown: (e: any) => {
      console.log('🖱️ Mouse down event');
      if (!e?.activeLabel) return;
      const index = mockData.findIndex(d => d.time === e.activeLabel);
      const newSelection = { start: index, end: index };
      selectionRef.current = newSelection;
      globalSelectionCallback?.(newSelection);
      forceUpdate({});
    },
    
    onMouseMove: (e: any) => {
      if (selectionRef.current.start === null || !e?.activeLabel) return;
      const index = mockData.findIndex(d => d.time === e.activeLabel);
      if (index !== selectionRef.current.end) {
        const newSelection = { ...selectionRef.current, end: index };
        selectionRef.current = newSelection;
        globalSelectionCallback?.(newSelection);
        forceUpdate({});
      }
    },
    
    onMouseUp: () => {
      console.log('🖱️ Mouse up event', selectionRef.current);
      // Clear selection if it's just a single point (click without drag)
      if (selectionRef.current.start !== null && selectionRef.current.start === selectionRef.current.end) {
        const newSelection = { start: null, end: null };
        selectionRef.current = newSelection;
        globalSelectionCallback?.(newSelection);
        forceUpdate({});
      }
    }
  }), []);
  
  // Direct calculation - always reflects current selection, enables overlay
  const referenceAreaProps = (() => {
    const { start, end } = selectionRef.current;
    if (start === null || end === null) return null;
    
    return {
      x1: mockData[Math.min(start, end)].time,
      x2: mockData[Math.max(start, end)].time,
      y1: 5,
      y2: 13,
      yAxisId: "pace" as const,
      fill: "#000",
      fillOpacity: 0.3,
    };
  })();
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={mockData}
        margin={chartMargin}
        onMouseDown={handlers.onMouseDown}
        onMouseMove={handlers.onMouseMove}
        onMouseUp={handlers.onMouseUp}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis yAxisId="pace" domain={[5, 13]} />
        <YAxis yAxisId="hr" orientation="right" domain={[80, 190]} />
        <Tooltip />
        {referenceAreaProps && (
          <ReferenceArea {...referenceAreaProps} />
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
  );
});

export function StatsOverview() {
  console.log('🔄 StatsOverview component re-rendering');
  
  const [selection, setSelection] = useState<{ start: number | null; end: number | null }>({ start: null, end: null });

  // Set up the global callback - this doesn't change, so no re-renders
  React.useEffect(() => {
    globalSelectionCallback = setSelection;
    return () => {
      globalSelectionCallback = null;
    };
  }, []);

  const segmentStats = useMemo(() => {
    if (selection.start === null || selection.end === null) return null;
    
    const start = Math.min(selection.start, selection.end);
    const end = Math.max(selection.start, selection.end);
    const segment = mockData.slice(start, end + 1);
    
    const avgPace = segment.reduce((sum, point) => sum + point.pace, 0) / segment.length;
    const avgHR = segment.reduce((sum, point) => sum + point.hr, 0) / segment.length;
    
    return {
      startTime: segment[0].time,
      endTime: segment[segment.length - 1].time,
      avgPace: avgPace.toFixed(1),
      avgHR: Math.round(avgHR),
    };
  }, [selection.start, selection.end]);

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
        <StaticChart />
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