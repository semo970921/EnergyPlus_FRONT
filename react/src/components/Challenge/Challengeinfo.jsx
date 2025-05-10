import React from "react";
import { Wrapper, Title } from "../TableStyle/Table.style";

const ChallengeInfo = () => {
  return (
    <Wrapper>
      <Title>챌린지 안내</Title>

      <section style={{ marginTop: "2rem", lineHeight: "1.8" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📢 에너지생활+ 챌린지란?</h2>
        <ol>
          <li>에너지생활+ 챌린지는 우리가 일상 속에서 실천할 수 있는 작은 친환경 행동을 함께 나누는 참여형 캠페인입니다.</li>
          <li>분리배출, 텀블러 사용, 대중교통 이용 등 실천한 내용을 인증해보세요.</li>
          <li>작은 행동 하나도 쌓이면 큰 변화를 만들어냅니다.</li>
        </ol>

        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🌱 에너지 챌린지 참여 방법</h2>
        <ol>
          <li>1. 실천한 친환경 행동을 선택하거나 자유롭게 입력해요.</li>
          <li>2. 인증 사진을 첨부하고 간단한 설명을 작성해요.</li>
          <li>3. 관리자의 승인 후 마일리지가 지급됩니다.</li>
        </ol>

        <h2 style={{ fontSize: "1.5rem", margin: "2rem 0 1rem" }}>🎁 마일리지 지급 기준</h2>
        <ul>
          <li>인증 내용이 명확하고 구체적일수록 높은 포인트가 지급됩니다.</li>
          <li>중복된 내용은 지급 대상에서 제외될 수 있습니다.</li>
        </ul>

        <h2 style={{ fontSize: "1.5rem", margin: "2rem 0 1rem" }}>📌 유의사항</h2>
        <ul>
          <li>허위 인증 시 제재를 받을 수 있습니다.</li>
          <li>사진은 본인이 직접 실천한 것을 기반으로 작성해야 합니다.</li>
        </ul>
      </section>
    </Wrapper>
  );
};

export default ChallengeInfo;
