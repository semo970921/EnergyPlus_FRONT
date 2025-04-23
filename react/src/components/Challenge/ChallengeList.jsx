// src/components/Challenge/ChallengeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  HeaderRow,
  List,
  Item,
  Button,
  UtilBox,
  SearchInput,
  Pagination,
  PageBtn
} from "./ChallengeList.style";

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
    <Container>
      <HeaderRow>
        <h2>이달의 챌린지 참여 게시판</h2>
        <UtilBox>
          <SearchInput
            type="text"
            placeholder="검색"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <Button onClick={handleSearch}>검색</Button>
          <Button onClick={() => navigate('/challenges/write')}>글 작성</Button>
        </UtilBox>
      </HeaderRow>

      <List>
        {challenges.map(c => (
          <Item key={c.challengeSeq} onClick={() => navigate(`/challenges/${c.challengeSeq}`)}>
            <span>{c.challengeSeq}</span>
            <span>{c.challengeTitle}</span>
            <span>{new Date(c.enrollDate).toLocaleDateString()}</span>
            <span>{c.challengeStatus === 'Y' ? '답변완료' : '확인중'}</span>
          </Item>
        ))}
      </List>

      <Pagination>
        <PageBtn onClick={() => {/* 이전 페이지 로직 */}}>&lt;&lt;</PageBtn>
        {[1,2,3,4,5].map(n => (
          <PageBtn key={n} onClick={() => {/* 페이지 이동 로직 */}}>{n}</PageBtn>
        ))}
        <PageBtn onClick={() => {/* 다음 페이지 로직 */}}>&gt;&gt;</PageBtn>
      </Pagination>
    </Container>
  );
};

export default ChallengeList;
