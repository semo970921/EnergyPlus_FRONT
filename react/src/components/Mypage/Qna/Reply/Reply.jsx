import { HeaderRow, ReplyDiv, ReplyTitle, ReplyDate, ReplyDetail } from "../MypageQna.style";
import { useEffect, useState } from "react";
import axios from "axios";


const Reply = ({ qnaId }) => {

  const [reply, setReply] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost/replys?qnaId=${qnaId}`)
      .then((response) => {

        if(response.status === 200){
          //console.log("댓글 응답 결과:", response.data);
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
  
  return(
    <>
      {reply ? (
        <ReplyDiv>
          <HeaderRow>
            <ReplyTitle>관리자</ReplyTitle>
            <ReplyDate>{reply.qnaReplyDate}</ReplyDate>
          </HeaderRow>
          <ReplyDetail>{reply.qnaReply}</ReplyDetail>
        </ReplyDiv>
      ) : (
        <ReplyDiv>
          <HeaderRow>
            <ReplyDetail>
              <p style={{ color: "gray", marginTop: "1rem" }}>등록된 댓글이 없습니다.</p>
            </ReplyDetail>
          </HeaderRow>
        </ReplyDiv>
      )}
    </>
  );
};

export default Reply;