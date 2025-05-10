import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import {
  Wrapper,
  HeaderRow,
  Title,
  StyledTable,
  WriteButton,
  BackBtn,
  SearchBox,
  SearchInput,
  SearchButton,
  Pagination,
  PageBtn
} from "../../TableStyle/Table.style";

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const size = 10;
  const totalPages = Math.ceil(totalCount / size);
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost/admin/notices", {
      params: { page, keyword: searchKeyword },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setNotices(res.data))
    .catch(err => {
      console.error("❌ 목록 실패:", err);
      setNotices([]);
    });

    axios.get("http://localhost/admin/notices/pages", {
      params: { keyword: searchKeyword },
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setTotalCount(res.data * size))
    .catch(err => {
      console.error("❌ 페이지 수 불러오기 실패:", err);
      setTotalCount(0);
    });
  }, [page, searchKeyword]);

  const handleSearch = () => {
    setPage(0);
    setSearchKeyword(keyword);
  };

  const resetSearch = () => {
    setKeyword("");
    setSearchKeyword("");
    setPage(0);
  };

  const goToWrite = () => navigate("/admin/noticewrite");
  const goToEdit = (id) => navigate(`/admin/notices/${id}/edit`);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    axios
      .delete(`http://localhost/admin/notices/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(() => {
        alert("삭제 완료");
        setNotices((prev) => prev.filter((n) => n.noticeId !== id));
      })
      .catch((err) => {
        console.error("❌ 삭제 실패", err);
        alert("삭제 중 오류 발생");
      });
  };

  // 페이징 계산
  const blockSize  = 5;
  const blockIndex = Math.floor(page / blockSize);
  const startPage  = blockIndex * blockSize;
  const endPage    = Math.min(startPage + blockSize, totalPages);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Wrapper style={{ flex: 1 }}>
        <HeaderRow>
          <Title>📢 관리자 공지사항</Title>
          <SearchBox>
            <SearchInput
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <SearchButton onClick={handleSearch}>검색</SearchButton>
            {keyword && <SearchButton onClick={resetSearch}>초기화</SearchButton>}
          </SearchBox>
          <WriteButton onClick={goToWrite}>공지 작성</WriteButton>
        </HeaderRow>

        <StyledTable>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성일</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.noticeId}>
                <td>{n.noticeId}</td>
                <td onClick={() => navigate(`/admin/notices/${n.noticeId}`)} style={{ cursor: "pointer" }}>
                  {n.noticeTitle}
                </td>
                <td>{n.noticeDate}</td>
                <td>
                  <button onClick={() => goToEdit(n.noticeId)}>수정</button>
                  <button onClick={() => handleDelete(n.noticeId)}>삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        {notices.length === 0 && (
          <p style={{ textAlign: "center", marginTop: 20, color: "#888" }}>
            등록된 공지사항이 없습니다.
          </p>
        )}

        <Pagination>
          <PageBtn onClick={() => setPage(0)} disabled={page === 0}>≪</PageBtn>
          <PageBtn onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0}>{"<"}</PageBtn>

          {Array.from({ length: endPage - startPage }, (_, i) => (
            <PageBtn
              key={startPage + i}
              onClick={() => setPage(startPage + i)}
              active={page === startPage + i}
            >
              {startPage + i + 1}
            </PageBtn>
          ))}

          <PageBtn onClick={() => setPage(p => Math.min(p + 1, totalPages - 1))} disabled={page === totalPages - 1}>{">"}</PageBtn>
          <PageBtn onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>≫</PageBtn>
        </Pagination>

        <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </div>
  );
};

export default AdminNotices;
