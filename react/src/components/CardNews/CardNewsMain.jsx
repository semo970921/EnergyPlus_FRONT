import React from "react";
import testImage from "../../assets/test-img/001.jpg";
import "./css/cardnews.css";
const CardNewsMain = () => {
  return (
    <>
      <div className="main-section-header">
        <h1 className="main-section-title">카드뉴스</h1>
        <span className="more-btn">더보기</span>
      </div>

      <div className="main-section cardnew-gallery">
        <ul className="gallery-list">
          <li className="gallery-list-item">
            <div className="thumb"></div>
            <img src={testImage} alt="카드뉴스썸네일" />
          </li>
          <li className="gallery-list-item">
            <img src={testImage} alt="카드뉴스썸네일" />
          </li>
          <li className="gallery-list-item">
            <img src={testImage} alt="카드뉴스썸네일" />
          </li>
        </ul>
      </div>
    </>
  );
};
export default CardNewsMain;
