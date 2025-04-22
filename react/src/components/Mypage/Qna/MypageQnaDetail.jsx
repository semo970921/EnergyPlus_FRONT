import { useParams, useNavigate } from "react-router-dom";
import { Wrapper, HeaderRow, Title, SearchBox, SearchButton, 
      DeleteButton, ContentDiv, BackBtn, 
      ContentTitle, ContentDate, ContentDetail } from "./MypageQna.style";
import { useEffect, useState } from "react";
import axios from "axios";

const MypageQnaDetail = () => {

  const navi = useNavigate();
  const { id } = useParams();

  const [boards, setBoards] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/mypage_detail/${id}")
    .then((reponse) => {
      console.log(response);
      setBoards(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return(
    <>
      <div>
        <p>QnA 번호: {id}</p>
      </div>

      <Wrapper>
        <HeaderRow>
          <Title>나의 QnA 확인</Title>
          <SearchBox>
            <SearchButton>글 수정</SearchButton>
            <DeleteButton>글 삭제</DeleteButton>
          </SearchBox>
        </HeaderRow>
        <ContentDiv>
          <HeaderRow>
            <ContentTitle>게시글 제목</ContentTitle>
            <ContentDate>2025.04.09</ContentDate>
          </HeaderRow>
          <hr/>
          <ContentDetail>
            안녕하세요. OOO 입니다.<br/>
            궁금한 점이 생겨서 글 씁니다.<br/><br/>

            It is a long established fact that a reader will be distracted by the readable content of a page 
            when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, 
            as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and 
            web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. 
            Various versions have evolved over the years, 
            sometimes by accident, sometimes on purpose (injected humour and the like).
          </ContentDetail>
        </ContentDiv>

        <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </>
  );
};

export default MypageQnaDetail;