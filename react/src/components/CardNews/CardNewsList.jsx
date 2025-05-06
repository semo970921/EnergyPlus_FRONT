import React, { useEffect, useState } from "react";
import testImage from "../../assets/test-img/001.jpg";
import "./css/cardnews.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardNewsList = () => {
  const [cardNewsList, setCardNewsList] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:80/admin/cardnews/list?page=0")
      .then((res) => {
        console.log("받은 카드뉴스 데이터:", res.data);
        setCardNewsList(res.data);
      })
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
        {cardNewsList.length === 0 ? (
          <p className="no-cardnews">등록된 카드뉴스가 없습니다.</p>
        ) : (
          <ul className="gallery-list no-list">
            {cardNewsList.map((item) => (
              <li
                className="gallery-item"
                key={item.cardNewsNo}
                onClick={() => navi(`/cardnews_detail/${item.cardNewsNo}`)}
              >
                <div className="item-thumb">
                  <img
                    src={
                      item.cardNewsImgUrl
                        ? `http://localhost:80${item.cardNewsImgUrl}`
                        : "/default-thumbnail.jpg"
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
        )}
      </div>
    </>
  );
};
export default CardNewsList;
