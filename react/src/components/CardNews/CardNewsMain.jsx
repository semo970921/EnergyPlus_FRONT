import React, { useEffect, useState } from "react";
import "./css/cardnews.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardNewsMain = () => {
  const [mainCardNews, setMainCardNews] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:80/admin/cardnews/main")
      .then((res) => setMainCardNews(res.data))
      .catch((err) => {
        console.error(err);
        alert("카드뉴스를 불러오는데 실패했습니다.");
      });
  }, []);

  return (
    <>
      <div className="main-section-header">
        <h1 className="main-section-title">카드뉴스</h1>
        <button className="more-btn" onClick={() => navi(`/cardnews/list`)}>
          더보기
        </button>
      </div>

      <div className="main-section cardnew-gallery">
        <ul className="gallery-list no-list">
          {mainCardNews.map((item) => (
            <li
              className="gallery-item"
              key={item.cardNewsNo}
              onClick={() => navi(`/cardnews_detail/${item.cardNewsNo}`)}
            >
              <div className="item-thumb">
                <img
                  src={
                    `http://localhost:80${item.cardNewsImgUrl}` ||
                    "/default-thumbnail.jpg"
                  }
                  alt="카드뉴스썸네일"
                />
              </div>
              <div className="item-info">
                <p className="item-title">{item.cardNewsTitle}</p>
                <span className="item-date">
                  {new Date(item.cardNewsDate).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CardNewsMain;
