import React, { useEffect, useState } from "react";
import "./css/cardnews.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CardNewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cardNews, setCardNews] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:80/admin/cardnews/${id}`)
      .then((res) => {
        setCardNews(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("카드뉴스 상세 정보를 불러오는데 실패했습니다.");
      });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:80/admin/cardnews/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        })
        .then(() => {
          alert("삭제 완료!");
          navigate("/cardnews/list");
        })
        .catch((err) => {
          alert("삭제 실패");
          console.error(err);
        });
    }
  };

  if (!cardNews) return <p>로딩 중...</p>;

  return (
    <div className="cardnews-container">
      <h1 className="page-title">카드뉴스</h1>
      <div className="cardnews-header">
        <h2 className="cardnews-title">{cardNews.cardNewsTitle}</h2>
        <p className="cardnews-date">2025.05.02</p>
      </div>

      <div className="cardnews-detail-content-wrap">
        <div className="cardnews-detail-content">
          <img
            src={
              `http://localhost:80${cardNews.cardNewsImgUrl}` ||
              "/default-thumbnail.jpg"
            }
            alt="카드뉴스 이미지"
          />
          <p className="cardnews-content">{cardNews.cardNewsContent}</p>
        </div>
      </div>

      <div className="cardnew-detail-buttons">
        <button
          className="cardnews-btn btn"
          onClick={() => navigate(`/admin/cardnews/edit/${id}`)}
        >
          수정하기
        </button>
        <button className="cardnews-btn btn danger" onClick={handleDelete}>
          삭제하기
        </button>
        <button
          className="cardnews-btn btn"
          onClick={() => navigate("/cardnews/list")}
        >
          목록
        </button>
      </div>
    </div>
  );
};

export default CardNewsDetail;
