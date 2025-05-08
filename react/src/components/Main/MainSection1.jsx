import React from "react";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import styled from "styled-components";

const MainSection1 = () => {
  return (
    <MainSection>
      <ChartRow>
        <ChartContainer>
          <h5>❓에너지 소비가 많은 업종은 무엇이며, 얼마나 차이 날까?</h5>
          <Chart1 />
          <h3>업종별 에너지 사용량</h3>
        </ChartContainer>
        <ChartContainer>
          <h5>❓에너지가 가장 많이 사용되는 용도는 무엇일까?</h5>
          <Chart2 />
          <h3>용도별 에너지 사용량</h3>
        </ChartContainer>
      </ChartRow>
      <MainSectionContent>
        한 걸음 덜 타고, 한 그릇 덜 버리고, 하나 더 실천하기! <br />
        지구를 가볍게 만들어봐요!! 😊
      </MainSectionContent>
    </MainSection>
  );
};

export default MainSection1;

const MainSection = styled.div`
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 50px;
  font-family: pretendard;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
`;

const ChartContainer = styled.div`
  width: 48%;
  background-color: white;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  h5,
  h3 {
    font-size: 1.2rem;
    color: #333;
    text-align: center;
  }

  h3 {
    font-weight: bold;
  }

  h5 {
    font-weight: normal;
    margin-top: 10px;
  }
`;

const MainSectionContent = styled.div`
  font-size: 20px;
  color: #333;
  line-height: 1.6;
  text-align: center;
  padding: 2rem;
  background-color: rgb(171, 224, 142);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  margin: 2rem auto;

  strong {
    font-weight: bold;
    color: #2c6e49;
  }

  p {
    margin-bottom: 1rem;
  }
`;
