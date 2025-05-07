import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminNotice = () => {
  const [notices, setNotices] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    // 관리자용 공지 목록 API 호출
    axios.get("/admin/notices") // 실제 주소 확인 필요
      .then(res => setNotices(res.data))
      .catch(err => console.error("공지 불러오기 실패", err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    axios.delete(`/admin/notices/${id}`)
      .then(() => {
        alert("삭제 완료");
        setNotices(prev => prev.filter(n => n.noticeId !== id));
      })
      .catch(err => {
        console.error("삭제 실패", err);
        alert("삭제 중 오류 발생");
      });
  };

  const goToWrite = () => navi("/admin/notices/write");
  const goToEdit = (id) => navi(`/admin/notices/${id}/edit`);

  return (
    <div>
      <h2>📢 관리자 공지사항 목록</h2>
      <button onClick={goToWrite}>공지 작성</button>
      <ul>
        {notices.map(notice => (
          <li key={notice.noticeId}>
            <strong>{notice.noticeTitle}</strong>
            <button onClick={() => goToEdit(notice.noticeId)}>수정</button>
            <button onClick={() => handleDelete(notice.noticeId)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotice;
