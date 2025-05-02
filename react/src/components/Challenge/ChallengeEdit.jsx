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

const ChallengeEdit = () => {
  const { challengeSeq } = useParams();
  const navi = useNavigate();

  const [form, setForm] = useState({
    challengeTitle: "",
    challengeContent: ""
  });

  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/challenges/${challengeSeq}`)
      .then(res => {
        setForm({
          challengeTitle: res.data.challengeTitle,
          challengeContent: res.data.challengeContent
        });
      })
      .catch(err => {
        console.error("기존 챌린지 불러오기 실패", err);
        alert("데이터를 불러올 수 없습니다.");
      });
  }, [challengeSeq]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("challengeTitle", form.challengeTitle);
    formData.append("challengeContent", form.challengeContent);
    
    if (file) {
        formData.append("file", file);
    }



    try {
      await axios.put(`http://localhost/challenges/${challengeSeq}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
      });

      alert("수정 완료되었습니다!");
      navi(`/challenges/${challengeSeq}`);
    } catch (err) {
      console.error("수정 실패", err);
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>챌린지 수정</Title>
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
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginTop: "1rem" }}
            />
      </ContentDiv>

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        <SearchButton onClick={handleSubmit}>수정 완료</SearchButton>
        <BackBtn onClick={() => navi(-1)}>취소</BackBtn>
      </div>
    </Wrapper>
  );
};

export default ChallengeEdit;
