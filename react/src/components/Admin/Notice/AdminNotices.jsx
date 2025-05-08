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
} from "../../TableStyle/Table.style";

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    axios.get("http://localhost/admin/notices",{
      params: {
        page: 0,
        keyword: ""
      },
      headers : {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("📢 관리자 공지사항 응답:", res.data); // 👈 로그 확인
        if (Array.isArray(res.data)) {
          setNotices(res.data);
        } else {
          console.warn("❗응답이 배열이 아님:", res.data);
          setNotices([]);
        }
      })
      .catch((err) => {
        console.error("❌ 공지사항 불러오기 실패:", err);
        setNotices([]);
      });
  }, []);
  

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

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Wrapper style={{ flex: 1 }}>
        <HeaderRow>
          <Title>📢 관리자 공지사항</Title>
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

        <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </div>
  );
};

export default AdminNotices;
