import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Title,
  DateText,
  Content,
  ButtonGroup,
  Button,
} from "./NoticeDetail.style";


const NoticeDetail = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
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


  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await axios.delete(`http://localhost/notices/${noticeId}`);
      navigate("/notices");
    } catch (err) {
      console.error("삭제 실패", err);
      alert("삭제에 실패했습니다.");
    }
  };

  if (!notice) return <p>로딩 중...</p>;

  return (
    <Container>
      <Title>{notice.noticeTitle}</Title>
      <DateText>{notice.noticeDate}</DateText>
      <hr />
      <Content>{notice.noticeContent}</Content>

      <ButtonGroup>
        <Button onClick={() => navigate(`/notices/write?editId=${noticeId}`)}>
          수정하기
        </Button>
        <Button variant="delete" onClick={handleDelete}>
          삭제하기
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default NoticeDetail;
