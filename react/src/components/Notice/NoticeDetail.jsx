import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// QnA 상세보기에서 쓰던 스타일 컴포넌트 전부 재활용
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
} from "../Mypage/Qna/MypageQna.style";

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navigate     = useNavigate();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/notices/${noticeId}`)
      .then(res => setNotice(res.data))
      .catch(err => console.error("공지사항 상세 불러오기 실패", err));
  }, [noticeId]);

  const handleEdit = () => navigate(`/notices/write?editId=${noticeId}`);
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await axios.delete(`http://localhost/notices/${noticeId}`);
    navigate("/notices");
  };

  if (!notice) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      {/* 글 번호 (QnA 페이지처럼) */}
      <p style={{ textAlign: "center", marginBottom: 8, color: "#555" }}>
        공지사항 번호: {noticeId}
      </p>

      {/* 1) 상단 헤더: 페이지 제목 + 버튼 */}
      <HeaderRow>
        <Title>공지사항 확인</Title>
        <SearchBox>
          <SearchButton onClick={handleEdit}>글 수정</SearchButton>
          <DeleteButton onClick={handleDelete}>글 삭제</DeleteButton>
        </SearchBox>
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
      <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
    </Wrapper>
  );
};

export default NoticeDetail;
