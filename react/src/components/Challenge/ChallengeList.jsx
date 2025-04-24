import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  HeaderRow,
  Title,
  SearchBox,
  SearchInput,
  SearchButton,
  StyledTable,
  WriteButton,
  Pagination,
  PageBtn,
  BackBtn
} from "../Mypage/Qna/MypageQna.style";


const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get('http://localhost/challenges');
      setChallenges(res.data);
    } catch (err) {
      console.error('챌린지 목록 불러오기 실패', err);
    }
  };

  const handleSearch = () => {
    if (!keyword) return fetchList();
    setChallenges(prev => prev.filter(item => item.challengeTitle.includes(keyword)));
  };

  return (
    <Wrapper>
      <HeaderRow>
          <Title>챌린지 참여 게시판</Title>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="검색"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
            <WriteButton onClick={() => navigate('/challenges/write')}>글 작성</WriteButton>
          </SearchBox>
      </HeaderRow>

        <StyledTable>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성시간</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map(c => (
              <tr key={c.challengeSeq} onClick={() => navigate(`/challenges/${c.challengeSeq}`)}>
                <td>{c.challengeSeq}</td>
                <td>{c.challengeTitle}</td>
                <td>{c.userName}</td>
                <td>{c.enrollDate}</td>
                <td>{c.challengeStatus === 'Y' ? '답변완료' : '확인중'}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

      <Pagination>
        <PageBtn onClick={() => {/* 이전 페이지 로직 */}}>&lt;&lt;</PageBtn>
        {[1,2,3,4,5].map(n => (
          <PageBtn key={n} onClick={() => {/* 페이지 이동 로직 */}}>{n}</PageBtn>
        ))}
        <PageBtn onClick={() => {/* 다음 페이지 로직 */}}>&gt;&gt;</PageBtn>
      </Pagination>
      </Wrapper>
  );
};

export default ChallengeList;
