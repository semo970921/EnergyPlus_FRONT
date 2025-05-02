import React from "react";
import testImage from "../../assets/test-img/001.jpg";
import "./css/cardnews.css";
import { useNavigate } from "react-router-dom";

const CardNewsList = () => {
  const navi = useNavigate();
  return (
    <>
      <div className="main-section-header">
        <h1 className="main-section-title">카드뉴스</h1>
      </div>

      <div className="main-section cardnew-gallery">
        <ul className="gallery-list no-list">
          <li className="gallery-item" onClick={() => navi(`/cardnews_detail`)}>
            <div className="item-thumb">
              <img src={testImage} alt="카드뉴스썸네일" />
            </div>
            <div className="item-info">
              <p className="item-title">
                새 출발기금 지원 대상, 혜택이 달라집니다.
              </p>
              <span className="item-date">2025.05.22</span>
            </div>
          </li>
          <li className="gallery-item">
            <div className="item-thumb">
              <img src={testImage} alt="카드뉴스썸네일" />
            </div>
            <div className="item-info">
              <p className="item-title">
                새 출발기금 지원 대상, 혜택이 달라집니다.
              </p>
              <span className="item-date">2025.05.22</span>
            </div>
          </li>
          <li className="gallery-item">
            <div className="item-thumb">
              <img src={testImage} alt="카드뉴스썸네일" />
            </div>
            <div className="item-info">
              <p className="item-title">
                새 출발기금 지원 대상, 혜택이 달라집니다.
              </p>
              <span className="item-date">2025.05.22</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default CardNewsList;
