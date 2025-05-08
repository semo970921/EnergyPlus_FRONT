import { HeaderRow, ReplyDiv, ReplyTitle, ReplyDate, 
  ReplyDetail, DeleteReply, SearchButton, Replybutton } from "../../../TableStyle/Table.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReplyForm from "./ReplyForm";
import ReplyFormEdit from "./ReplyFormEdit";


const Reply = ({ qnaId }) => {

  const navi = useNavigate();
  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // 수정 여부
  const [isEditing, setIsEditing] = useState(false);

  // 댓글 불러오기
  const fetchReply = () => {
    axios.get(`http://localhost/replys?qnaId=${qnaId}`)
      .then((response) => {
        if (response.status === 200 && response.data.length > 0) {
          setReply(response.data[0]);
        } else {
          setReply(null);
        }
      })
      .catch((error) => {
        console.log("댓글 조회 중 오류 발생", error);
        setReply(null);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReply();
  }, [qnaId]);

  if (loading) {
    return <p>댓글을 불러오는 중입니다...</p>;
  }

  
  return (
    <>
      {reply ? (
        isEditing ? (
          <ReplyFormEdit
            qnaId={qnaId}
            replyId={reply.qnaReplyId}
            originReply={reply.qnaReply}
            onComplete={handleComplete}
          />
        ) : (
          <>
            <br />
            <ReplyDiv>
              <HeaderRow>
                <ReplyTitle>관리자</ReplyTitle>
                <ReplyDate>{reply.qnaReplyDate}</ReplyDate>
              </HeaderRow>
              <ReplyDetail>{reply.qnaReply}</ReplyDetail>
            </ReplyDiv>
          </>
        )
      ) : (
        <>
          <ReplyForm qnaId={qnaId} onComplete={handleComplete} />
        </>
      )}
    </>
  );
};

export default Reply;