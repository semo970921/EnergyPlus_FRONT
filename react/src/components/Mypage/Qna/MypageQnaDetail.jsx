import { useParams, useNavigate } from "react-router-dom";
import { Wrapper, HeaderRow, Title, SearchBox, SearchButton, 
      DeleteButton, ContentDiv, BackBtn, 
      ContentTitle, ContentDate, ContentDetail } from "../../TableStyle/Table.style";
import { useEffect, useState } from "react";
import axios from "axios";
import Reply from "./Reply/Reply";
import ReplyForm from "./Reply/ReplyForm";

const MypageQnaDetail = () => {

  const navi = useNavigate();
  const { id } = useParams();

  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 댓글 현황(Y/N)
  const [qnaStatus, setQnaStatus] = useState(null);
  
  // 조회
  useEffect(() => {
    axios.get(`http://localhost/qnas/${id}`)
      .then((response) => {
        // console.log(response);
        setBoard(response.data);
        setLoading(false);
        setQnaStatus(response.data.qnaStatus);
      })
      .catch((error) => {
        //console.log(error);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // 삭제
  const handleDelete = (e) => {
    e.preventDefault();
    
    if(confirm("정말 삭제하시겠습니까?")){
      // 로그인 구현 완료되면 아래 부분 수정
      axios.delete(`http://localhost/qnas/${id}`)
      .then(() => {
        setBoard({
          qnaTitle : "삭제중입니다...",
          qnaDate : "삭제중입니다...",
          qnaContent : "삭제중입니다..."
        });

        setTimeout(() => {
          alert("삭제되었습니다.");
          navi("/mypage_qna");
        }, 500);
      });
    }
  };

  // 수정
  const handleEdit = () => {
    navi(`/mypage_qna_form/${id}`, { replace: true });
  };


  if (loading) {
    return (
      <HeaderRow>
        <ContentTitle>게시글을 불러오는 중입니다...</ContentTitle>
      </HeaderRow>
    );
  }
  if (error) {
    return (
      <HeaderRow>
        <ContentTitle>게시글을 찾을 수 없습니다.</ContentTitle>
      </HeaderRow>
    );
  }

  return(
    <>
      <Wrapper>
        <HeaderRow>
          <Title>나의 QnA 확인({id})</Title>
          <SearchBox>
            <SearchButton onClick={handleEdit}>글 수정</SearchButton>
            <DeleteButton onClick={handleDelete}>글 삭제</DeleteButton>
          </SearchBox>
        </HeaderRow>
        <ContentDiv>
          <HeaderRow>
            <ContentTitle>{board.qnaTitle}</ContentTitle>
            <ContentDate>{board.qnaDate}</ContentDate>
          </HeaderRow>
          <hr/>
          <ContentDetail>
            {board.qnaContent}
          </ContentDetail>
        </ContentDiv>
        
        {/* 댓글란 */}

        {qnaStatus === "Y" ? (
          <Reply qnaId={id} /> // 댓글 존재
        ) : qnaStatus === "N" ? (
          <ReplyForm qnaId={id} /> // 댓글 없음 → 작성 폼
        ) : (
          <p>댓글 상태를 불러오는 중입니다...</p> // 초기 로딩 처리
        )}

        <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </>
  );
};

export default MypageQnaDetail;