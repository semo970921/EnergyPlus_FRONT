import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  HeaderRow,
  Title,
  ContentDiv,
  ContentTitle,
  ContentDetail,
  BackBtn,
  SearchButton
} from "../TableStyle/Table.style";

const NoticeEdit = () => {
  const { noticeId } = useParams();
  const navi = useNavigate();

  const [form, setForm] = useState({
    noticeTitle: "",
    noticeContent: ""
  });

  useEffect(() => {
    axios.get(`http://localhost/notices/${noticeId}`)
      .then(res => {
        setForm({
          noticeTitle: res.data.noticeTitle,
          noticeContent: res.data.noticeContent
        });
      })
      .catch(err => {
        console.error("기존 챌린지 불러오기 실패", err);
        alert("데이터를 불러올 수 없습니다.");
      });
  }, [noticeId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost/notices/${noticeId}`, form);
      alert("수정 완료되었습니다!");
      navi(`/notices/${noticeId}`); // 수정 완료 후 상세페이지로 이동
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>공지사항 수정</Title>
      </HeaderRow>

      <ContentDiv>
        <ContentTitle>
          <input
            type="text"
            name="noticeTitle"
            value={form.noticeTitle}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            style={{ width: "100%", padding: "0.5rem", fontSize: "1.2rem" }}
          />
        </ContentTitle>
        <ContentDetail>
          <textarea
            name="noticeContent"
            value={form.noticeContent}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            style={{ width: "100%", height: "300px", padding: "0.5rem", fontSize: "1rem" }}
          />
        </ContentDetail>
      </ContentDiv>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <SearchButton onClick={handleSubmit}>수정 완료</SearchButton>
        <BackBtn onClick={() => navi(-1)}>취소</BackBtn>
      </div>
    </Wrapper>
  );
};

export default NoticeEdit;
