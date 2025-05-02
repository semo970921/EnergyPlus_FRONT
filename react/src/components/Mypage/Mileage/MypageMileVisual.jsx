import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);


const MypageMileVisual = () => {

  const navi = useNavigate();

  // 마일리지 총합 더미 데이터
  const availableMileage = 1400;

  // 카테고리별 총합 더미 데이터
  const consumedData = {
    labels: ["자전거", "다회용기"],
    datasets: [
      {
        data: [70, 30],
        backgroundColor: ["#ef5350", "#64b5f6"],
        borderWidth: 1,
      },
    ],
  };

  return(
    <>
      <Container>
        <Title>마일리지 현황</Title>

        <Content>
          <MileageBox>
            <p>사용 가능한 마일리지</p>
            <strong>
              {availableMileage.toLocaleString()}<span>마일리지</span>
            </strong>
          </MileageBox>

          <ChartWrap>
            <Pie data={consumedData} />
            <ChartLabel>내가 소비한 마일리지</ChartLabel>
          </ChartWrap>
        </Content>

        <ButtonWrap>
          <GreenBtn onClick={() => navi("/mypage_mile")}>마일리지 신청 현황 바로가기</GreenBtn>
          <WhiteBtn onClick={() => navi(-1)}>뒤로가기</WhiteBtn>
        </ButtonWrap>
      </Container>
    </>
  );
};

export default MypageMileVisual;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 4rem;
`;

const Title = styled.h2`
  font-weight: bold;
  align-self: flex-start;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  width: 100%;
`;

const MileageBox = styled.div`
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

const ChartWrap = styled.div`
  width: 300px;
  text-align: center;
  margin-left: 20px;
`;

const ChartLabel = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  font-size: 20px;
`;

const ButtonWrap = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

const GreenBtn = styled.button`
  padding: 0.8rem 1.6rem;
  background-color: #408C70;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const WhiteBtn = styled.button`
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