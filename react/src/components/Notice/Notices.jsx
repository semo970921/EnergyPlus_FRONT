import React, { useState, useEffect } from "react";
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

// …imports 생략…

const Notices = () => {
  const [notices, setNotices]             = useState([]);
  const [page, setPage]                   = useState(0);
  const [totalCount, setTotalCount]       = useState(0);
  const [keyword, setKeyword]             = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const size                               = 5;
  const totalPages                         = Math.ceil(totalCount / size);
  const navigate                           = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/notices", {
      params: { page, size, keyword: searchKeyword }
    })
    .then(res => {
      console.log("▶ API 응답", res.data);

      setNotices(res.data);
      setTotalCount(res.data.length);

      // 혹은 PageInfo(list/pages/total) 사용 시:
      // setNotices(res.data.list);
      // setTotalCount(res.data.total);
    })
    .catch(err => console.error("공지사항 불러오기 실패", err));
  }, [page, searchKeyword]);




  // 2) 검색 핸들러
  const handleSearch = () => {
    setPage(0);
    setSearchKeyword(keyword);
  };
  const resetSearch = () => {
    setKeyword("");
    setSearchKeyword("");
    setPage(0);
  };

  // 3) 페이징 블록 계산 (QnA와 동일)
  const blockSize  = 5;
  const blockIndex = Math.floor(page / blockSize);
  const startPage  = blockIndex * blockSize;
  const endPage    = Math.min(startPage + blockSize, totalPages);

  return (
    <Wrapper>
      {/* 1) 제목 + 검색창 + 글 작성 버튼 */}
      <HeaderRow>
        <Title>공지사항</Title>
        <SearchBox>
          <SearchInput
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
          {keyword && (
            <SearchButton onClick={resetSearch}>초기화</SearchButton>
          )}
          <WriteButton onClick={() => navigate("/noticewrite")}>
            글 작성
          </WriteButton>
        </SearchBox>
      </HeaderRow>

      {/* 2) 테이블 */}
      <StyledTable>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성시간</th>
          </tr>
        </thead>
        <tbody>
          {notices.map(n => (
            <tr
              key={n.noticeId}
              onClick={() => navigate(`/notices/${n.noticeId}`)}
              style={{ cursor: "pointer" }}
            >
              <td>{n.noticeId}</td>
              <td>{n.noticeTitle}</td>
              <td>{n.noticeDate}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      {/* 3) 결과 없을 때 */}
      {notices.length === 0 && (
        <p style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
          검색 결과가 없습니다.
        </p>
      )}

      {/* 4) 페이징 */}
      <Pagination>
        <PageBtn onClick={() => setPage(0)} disabled={page === 0}>
          ≪
        </PageBtn>
        <PageBtn
          onClick={() => setPage(p => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          {"<"}
        </PageBtn>

        {Array.from({ length: endPage - startPage }, (_, i) => (
          <PageBtn
            key={startPage + i}
            onClick={() => setPage(startPage + i)}
            active={page === startPage + i}
          >
            {startPage + i + 1}
          </PageBtn>
        ))}

        <PageBtn
          onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))}
          disabled={page === totalPages - 1}
        >
          {">"}
        </PageBtn>
        <PageBtn
          onClick={() => setPage(totalPages - 1)}
          disabled={page === totalPages - 1}
        >
          ≫
        </PageBtn>
      </Pagination>

      {/* 5) 뒤로가기 */}
      <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
    </Wrapper>
  );
};

export default Notices;
