import React, { useEffect, useState } from "react";
import testImage from "../../assets/test-img/001.jpg";
import "./css/cardnews.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardNewsList = () => {
  const [cardnewsList, setCardnewsList] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:80/cardnews?page=0")
      .then((res) => setCardnewsList(res.data))
      .catch((err) => {
        console.error(err);
        alert("카드뉴스를 불러오는데 실패했습니다.");
      });
  }, []);
  return (
    <>
      <div className="main-section-header">
        <h1 className="main-section-title">카드뉴스</h1>
      </div>

      <div className="main-section cardnew-gallery">
        <ul className="gallery-list no-list">
          {cardnewsList.map((item) => (
            <li
              className="gallery-item"
              key={item.cardNewsNo}
              onClick={() => navi(`/cardnews_detail/${item.cardNewsNo}`)}
            >
              <div className="item-thumb">
                <img
                  src={item.cardNewsImgUrl || "/default-thumbnail.jpg"}
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
export default CardNewsList;
