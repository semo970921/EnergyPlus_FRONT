import React from "react";
import {
  HeroSection,
  LightSection,
  CTAButton,
  ActionList,
  SimpleList
} from "./MainSection2.style";
import main01Img from "../../assets/img/main01.jpg";

const MainSection2 = () => {
  return (
    <>
      <HeroSection img={main01Img}>
        <div>
          <h1>탄소 절감, 지금부터 시작해요</h1>
          <p>에너지생활+와 함께 기후 위기를 줄여봐요 🌎</p>
        </div>
      </HeroSection>

      <LightSection>
        <h2>탄소 절감, 이런 효과가 있어요!</h2>
        <ul>
          <li>🌱 에너지 효율 향상 – 전기 사용량 줄고, 경제적 이득까지!</li>
          <li>🌳 도시 녹지 확대 – 평균 17% 이상 탄소 배출 감소!</li>
          <li>💰 비용 절감 – 가정/기업 모두 혜택!</li>
        </ul>
        <CTAButton>지금 참여하기</CTAButton>
      </LightSection>

      <LightSection>
        <h2>마일리지는 이렇게 사용해요</h2>
        <ul>
          <li>🎁 제휴처에서 상품권으로!</li>
          <li>💚 환경단체, 복지단체에 기부!</li>
        </ul>
        <p>작은 실천이 세상을 바꿉니다.</p>
        <CTAButton>마일리지 사용처 보기</CTAButton>
      </LightSection>

      <LightSection>
        <h2>실천 항목별 소개</h2>
        <ActionList>
          <li>
            <h3>🚶 자동차 대신 걷기/자전거</h3>
            <p>운전 줄이기 인증 시 포인트 쌓여요!</p>
            <CTAButton>운행 줄이기 인증</CTAButton>
          </li>
          <li>
            <h3>🚴 출퇴근길 자전거 이용</h3>
            <p>탄소 감축 + 건강 + 마일리지!</p>
            <CTAButton>자전거 인증</CTAButton>
          </li>
          <li>
            <h3>🥤 다회용기 사용</h3>
            <p>텀블러, 도시락통 인증 시마다 적립!</p>
            <CTAButton>다회용기 인증</CTAButton>
          </li>
        </ActionList>
      </LightSection>

      <LightSection>
        <h2>참여는 이렇게 쉬워요!</h2>
        <SimpleList>
          <li>1. 회원가입</li>
          <li>2. 실천하고 사진 인증</li>
          <li>3. 마일리지 적립</li>
          <li>4. 상품권 교환 또는 기부</li>
        </SimpleList>
        <CTAButton>탄소절감 실천 시작하기</CTAButton>
        <CTAButton>마일리지 적립 방법 보기</CTAButton>
      </LightSection>
    </>
  );
};

export default MainSection2;