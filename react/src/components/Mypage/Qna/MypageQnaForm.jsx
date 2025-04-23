import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Wrapper, HeaderRow, Title, ContentDiv, BackBtn, UpdateInput, UpdateBtn, UpdateTextarea,
  ContentDetail, FooterRow } from "./MypageQna.style";

const MypageQnaForm = () => {

  const navi = useNavigate();
  const { id } = useParams(); // 있으면 수정, 없으면 새글작성
  const isEdit = !!id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if(isEdit) {
      axios.get(`http://localhost/qnas/${id}`)
        .then((response) => {
          setTitle(response.data.qnaTitle);
          setContent(response.data.qnaContent);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const handleSubmit = () => {
    const data = { qnaTitle: title, qnaContent: content };
    if(isEdit){
      axios.put(`http://localhost/qnas/${id}`, data)
        .then(() => {
          alert("게시글이 수정되었습니다.");
          navi(`/mypage_qna/${id}`, { replace: true });
        });
    } else{
      axios.post(`http://localhost/qnas`, data)
        .then(() => { 
          alert("게시글이 작성되었습니다.");
          navi("/mypage_qna");
        });
    }
  };

  // 뒤로가기
  const handleBack = () => {
    const isOnEditPage = location.pathname.includes("/mypage_qna_form");
  
    if (isOnEditPage && isEdit) {
      // 수정 페이지에서 뒤로가기 → 상세로
      navi(`/mypage_qna/${id}`, { replace: true });
    } else {
      // 그 외엔 목록으로
      navi("/mypage_qna");
    }
  };


  return(
    <>
      <Wrapper>
        <HeaderRow>
          <Title>{isEdit ? "글 수정" : "글 작성"}</Title>
        </HeaderRow>
        <ContentDiv>
          <HeaderRow>
            <div style={{ width: "100%" }}>
              <UpdateInput  value={title} onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 작성해주세요." />
            </div>
          </HeaderRow>
          <hr/>
          <ContentDetail>
            <UpdateTextarea value={content} onChange={(e) => setContent(e.target.value)} 
                            placeholder="내용을 작성해주세요."/>
          </ContentDetail>
        </ContentDiv>

        <div style={{ textAlign: "center" }}>
          <FooterRow>
            <UpdateBtn onClick={handleSubmit}>{isEdit ? "수정하기" : "작성하기"}</UpdateBtn>
            <BackBtn onClick={handleBack}>뒤로가기</BackBtn>
          </FooterRow>
        </div>

      </Wrapper>
    </>
  );
};

export default MypageQnaForm;