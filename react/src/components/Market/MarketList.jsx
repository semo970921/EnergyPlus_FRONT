import axios from "axios";
import defaultImg from "../../assets/img/default.jpg";
import { useNavigate } from "react-router-dom";
import { FaBeer } from "react-icons/fa";

import "./css/market.css";
import { useEffect, useState } from "react";
const MarketList = () => {
  const [marketList, setMarketList] = useState([]);
  const navi = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost/markets");
        setMarketList(res.data);
      } catch (err) {
        console.error("리스트 조회 실패 :", err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h1 className="page-title">중고거래</h1>
      <div className="btn-wrap text-align-end">
        <button
          className="btn market-btn btn-write"
          onClick={() => navi(`/marketform`)}
        >
          글쓰기
        </button>
      </div>
      <div className="market-gallery">
        <ul className="gallery-list no-list">
          {marketList.map((item, idx) =>
            item ? (
              <li
                className="gallery-item"
                key={item.marketNo || idx}
                onClick={() => navi(`/markets/${item.marketNo}`)}
              >
                <div className="item-thumb">
                  <span className="item-status">{item.marketStatusLabel}</span>
                  <img
                    src={
                      item.thumbnailUrl
                        ? `http://localhost${item.thumbnailUrl}`
                        : defaultImg
                    }
                    alt="중고아이템"
                    className="item-image"
                  />
                  <div className="item-info">
                    <p className="item-price">
                      {item.marketPrice.toLocaleString()}원
                    </p>
                    <p className="item-title">{item.marketTitle}</p>
                    <div className="item-meta">
                      <span className="item-seller">
                        {item.userName || "판매자"}
                      </span>
                      <span className="item-date">
                        {new Date(item.marketDate).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ) : null
          )}
        </ul>
      </div>
    </>
  );
};

export default MarketList;
