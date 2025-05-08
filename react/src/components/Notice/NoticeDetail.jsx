import React, { useState, useEffect } from "react";
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

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navi     = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/notices/${noticeId}`)
      .then(res => setNotice(res.data))
      .catch(err => console.error("공지사항 상세 불러오기 실패", err));
  }, [noticeId]);

  if (!notice) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      <p style={{ textAlign: "center", marginBottom: 8, color: "#555" }}>
      </p>

      {/* 1) 상단 헤더: 페이지 제목 + 버튼 */}
      <HeaderRow>
        <Title>공지사항 확인</Title>
      </HeaderRow>

      {/* 2) 카드형 콘텐츠 */}
      <ContentDiv>
        {/* 제목(왼쪽) / 날짜(오른쪽) */}
        <HeaderRow>
          <ContentTitle>{notice.noticeTitle}</ContentTitle>
          <ContentDate>{notice.noticeDate}</ContentDate>
        </HeaderRow>

        {/* 구분선 */}
        <hr />

        {/* 본문 */}
        <ContentDetail>{notice.noticeContent}</ContentDetail>
      </ContentDiv>

      {/* 3) 뒤로가기 버튼 */}
      <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
    </Wrapper>
  );
};

export default NoticeDetail;
