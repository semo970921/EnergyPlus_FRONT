import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  HeaderRow,
  Title,
  SearchBox,
  SearchButton,
  DeleteButton,
  ContentDiv,
  ContentTitle,
  ContentDate,
  ContentDetail,
  BackBtn
} from "../TableStyle/Table.style";

const ChallengeDetail = () => {
  const { challengeSeq } = useParams();
  const navi = useNavigate();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/challenges/${challengeSeq}`)
      .then(res => setChallenge(res.data))
      .catch(err => console.error("챌린지 상세 불러오기 실패", err));
  }, [challengeSeq]);

  if (!challenge) return <p>불러오는 중...</p>;

  return (
    <>
      <Wrapper>
        <HeaderRow>
          <Title>챌린지 상세 확인</Title>
        </HeaderRow>

        <ContentDiv>
          <HeaderRow>
            <ContentTitle>{challenge.challengeTitle}</ContentTitle>
            <ContentDate>No: {challenge.challengeSeq}</ContentDate>
            <strong>{challenge.userName}</strong>
            <strong>{challenge.enrollDate}</strong>
          </HeaderRow>
          <hr />
          <ContentDetail>
            {challenge.challengeContent}
            <br /><br />
            <strong>상태:</strong> {challenge.challengeStatus === "Y" ? "완료" : "진행중"}
          </ContentDetail>
        </ContentDiv>

        <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </>
  );
};

export default ChallengeDetail;
