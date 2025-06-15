import styled from 'styled-components';
import { ChartBarIcon } from '@heroicons/react/24/outline';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  min-width: 0;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1.25rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1rem 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
  
  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(59, 130, 246, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  
  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #ffffff;
  letter-spacing: -0.025em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 768px) {
    font-size: 1.375rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const Subtitle = styled.p`
  font-size: 0.875rem;
  color: #cbd5e1;
  margin: 0;
  font-weight: 400;
  letter-spacing: 0.025em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  
  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <IconWrapper>
          <ChartBarIcon className="w-6 h-6 text-blue-400" />
        </IconWrapper>
        <TitleSection>
          <Title>RunTracker</Title>
          <Subtitle>Performance Analytics Dashboard</Subtitle>
        </TitleSection>
      </HeaderContent>
    </HeaderContainer>
  );
}