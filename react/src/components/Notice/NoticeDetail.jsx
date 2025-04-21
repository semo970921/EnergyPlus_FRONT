import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const NoticeDetail = () => {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost/notices/${noticeId}`)
      .then((res) => {
        setNotice(res.data);
      })
      .catch((err) => {
        console.error("공지사항 상세 불러오기 실패", err);
      });
  }, [noticeId]);

  if (!notice) return <p>로딩 중...</p>;

  return (
    <div style={{ padding: "30px" }}>
      <h2>{notice.noticeTitle}</h2>
      <p>{notice.noticeDate}</p>
      <hr />
      <p>{notice.noticeContent}</p>
    </div>
  );
};

export default NoticeDetail;
