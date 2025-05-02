import React from "react";
import testImage from "../../assets/test-img/001.jpg";
import "./css/cardnews.css";
import { useNavigate } from "react-router-dom";
const CardNewsDetail = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="cardnews-container">
        <h1 className="page-title">카드뉴스</h1>
        <p className="cardnews-date">2025.05.02</p>
        <div className="cardnews-detail-content-wrap">
          <div className="cardnews-detail-content">
            <img src={testImage} alt="카드뉴스썸네일" />
          </div>
        </div>
        <div className="cardnew-detail-buttons">
          <button
            className="cardnew-btn btn"
            onClick={() => navigate("/cardnews_list")}
          >
            목록
          </button>
        </div>
      </div>
    </>
  );
};
export default CardNewsDetail;
