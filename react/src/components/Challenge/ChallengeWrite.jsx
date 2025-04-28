import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const ChallengeWrite = () => {
  const navi = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("editId");

  const [form, setForm] = useState({
    challengeTitle: "",
    challengeContent: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    if (editId) {
      // 수정 모드 - 기존 글 불러오기
      axios.get(`http://localhost/challenges/${editId}`)
        .then(res => {
          setForm({
            challengeTitle: res.data.challengeTitle,
            challengeContent: res.data.challengeContent
          });
        })
        .catch(err => {
          console.error("수정할 챌린지 불러오기 실패", err);
          alert("글을 불러올 수 없습니다.");
        });
    }
  }, [editId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {

      const formData = new FormData();
      formData.append("challengeTitle", form.challengeTitle);
      formData.append("challengeContent", form.challengeContent);
      if (file) {
        formData.append("file", file);
      }

      if (editId) {
        // 수정 모드
        await axios.put(`http://localhost/challenges/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert("수정 완료되었습니다!");
        navi(`/challenges/${editId}`);
      } else {
        // 작성 모드
        await axios.post(`http://localhost/challenges`, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        alert("작성 완료되었습니다!");
        navi("/challenges");
      }
    } catch (err) {
      console.error("등록/수정 실패", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>{editId ? "챌린지 수정" : "챌린지 작성"}</Title>
      </HeaderRow>

      <ContentDiv>
        <ContentTitle>
          <input
            type="text"
            name="challengeTitle"
            value={form.challengeTitle}
            onChange={handleChange}
            placeholder="제목을 입력하세요"
            style={{ width: "100%", padding: "0.5rem", fontSize: "1.2rem" }}
          />
        </ContentTitle>

        <ContentDetail>
          <textarea
            name="challengeContent"
            value={form.challengeContent}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
            style={{ width: "100%", height: "300px", padding: "0.5rem", fontSize: "1rem" }}
          />
        </ContentDetail>

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: "1rem" }}
        />
      </ContentDiv>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <SearchButton onClick={handleSubmit}>{editId ? "수정 완료" : "작성 완료"}</SearchButton>
        <BackBtn onClick={() => navi(-1)}>취소</BackBtn>
      </div>
    </Wrapper>
  );
};

export default ChallengeWrite;
