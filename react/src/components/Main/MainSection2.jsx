import React from "react";
import main01Img from "../../assets/img/main01.jpg";
const MainSection2 = () => {
  return (
    <div className="main-page-container">
      {/* 탄소 절감 장점 섹션 */}
      <section className="benefits-section">
        <div className="benefits-content">
          <div className="benefits-content-left">
            <img src={main01Img} alt="" />
          </div>
          <div className="benefits-content-right">
            <h2>탄소 절감, 이렇게 좋은 점이 많아요!</h2>
            <ul>
              <li>에너지 효율 향상 – 전기 사용량 줄고, 경제적 이득까지!</li>
              <li>
                도시 녹지 확대로 삶의 질 UP – 평균 17% 이상 탄소 배출 감소!
              </li>
              <li>탄소 절감 = 비용 절감 – 가정/기업 모두 혜택!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 참여하기 섹션 */}
      <section className="participation-section">
        <h2>당신의 작은 실천</h2>
        <p>
          탄소 절감 + 마일리지 + 기부까지! 자동차 대신 자전거, 일회용기 대신
          다회용기, 이동 습관을 바꾸면 마일리지가 쌓입니다!
        </p>
        <button className="cta-button">지금 참여하기</button>
      </section>

      {/* 마일리지 사용처 안내 섹션 */}
      <section className="mileage-section">
        <h2>마일리지는 어떻게 쓰나요?</h2>
        <ul>
          <li>✔ 상품권으로 교환 – 제휴 카페, 마트, 편의점 등에서 사용 가능!</li>
          <li>✔ 기부로 전환 – 환경단체, 취약계층 지원에 참여할 수 있어요.</li>
        </ul>
        <p>
          작은 습관이 나를 위한 혜택이 되고, 누군가에게도 따뜻한 힘이 됩니다.
        </p>
        <button className="cta-button">마일리지 사용처 보기</button>
      </section>

      {/* 실천 항목별 소개 섹션 */}
      <section className="actions-section">
        <h2>실천 항목별 소개</h2>
        <ul>
          <li>
            <h3>자동차 대신 걷기 or 자전거!</h3>
            <p>운전 줄이기 인증하면 포인트가 쏙쏙!</p>
            <button>운행 줄이기 인증하러 가기</button>
          </li>
          <li>
            <h3>출퇴근길, 자전거로 바꾸기</h3>
            <p>탄소 감축 + 건강 + 마일리지 혜택까지!</p>
            <button>자전거 인증 바로가기</button>
          </li>
          <li>
            <h3>다회용기, 습관처럼 들고 다니기</h3>
            <p>텀블러, 도시락통 인증 시마다 적립!</p>
            <button>다회용기 인증하러 가기</button>
          </li>
        </ul>
      </section>

      {/* 참여 방법 안내 섹션 */}
      <section className="how-to-participate">
        <h2>참여는 이렇게 쉬워요!</h2>
        <ul>
          <li>회원가입</li>
          <li>실천하고 사진 인증</li>
          <li>마일리지 적립</li>
          <li>상품권으로 교환하거나 기부하기</li>
        </ul>
        <button className="cta-button">탄소절감 실천 시작하기</button>
        <button className="cta-button">마일리지 적립 방법 알아보기</button>
      </section>
    </div>
  );
};

export default MainSection2;
