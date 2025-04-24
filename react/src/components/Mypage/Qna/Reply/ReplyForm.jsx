import { HeaderRow, ReplyDiv, ReplyDetail, SearchButton, ReplyTextarea } from "../../../TableStyle/Table.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const ReplyForm = ({ qnaId }) => {

  const navi = useNavigate();
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost/replys?qnaId=${qnaId}`)
      .then((response) => {

        if(response.status === 200){
          console.log("댓글 응답 결과:", response.data);
          setReply(response.data[0]); // 댓글 있음

        } else if(response.status === 204) {
          setReply(null); // 댓글 없음
        }

      })
      .catch((error) => {
        console.log("댓글 조회 중 오류 발생", error);
        setReply(null);
      })
      .finally(() => setLoading(false));
  }, [qnaId]);

  if(loading) {
    return <p>댓글을 불러오는 중입니다...</p>;
  }

  // 댓글 삭제
  const handleDelete = (e) => {
    e.preventDefault();

    if(confirm("정말 삭제하시겠습니까?")){
      axios.delete(`http://localhost/replys/${reply.qnaReplyId}`)
      .then(() => {
        setReply({
          replyId : "삭제 중입니다...",
        });

        setTimeout(() => {
          alert("삭제되었습니다.");
          navi("/mypage_qna");
        }, 500);
      })
      .catch((err) => {
        console.error("댓글 삭제 실패:", err.response || err.message);
        alert("삭제에 실패했습니다.");
      });
    }
  };
  
  return(
    <>
      <br/>
      <ReplyDiv>
        <HeaderRow>
            <ReplyTextarea />
            <SearchButton>등록</SearchButton>
        </HeaderRow>
      </ReplyDiv>
    </>
  );
};

export default ReplyForm;