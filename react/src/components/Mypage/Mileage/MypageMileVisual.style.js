import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
`;

export const Title = styled.h2`
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 2rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  width: 100%;
`;

export const MileageBox = styled.div`
  border: 1px solid #333;
  border-radius: 8px;
  padding: 1.8rem 2.8rem;
  text-align: center;

  p {
    font-size: 1.2rem;
  }

  strong {
    font-size: 2.2rem;
  }

  span {
    font-size: 1.2rem;
    margin-left: 4px;
  }
`;

export const ChartWrap = styled.div`
  width: 300px;
  text-align: center;
  margin-left: 20px;
`;

export const ChartLabel = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 20px;
`;

export const ButtonWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

export const GreenBtn = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: #408C70;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const WhiteBtn = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: white;
  border: 2px solid #408C70;
  color: #408C70;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #408C70;
    color: white;
  }
`;

// Chart 주변 레이아웃
export const ChartContainer = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoDataBox = styled.div`
  width: 300px;
  height: 300px;
  background-color: #f2f2f2;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoDataText = styled.div`
  color: #999;
  font-size: 1.1rem;
  text-align: center;
`;