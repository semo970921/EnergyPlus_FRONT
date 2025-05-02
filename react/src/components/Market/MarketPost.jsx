import axios from "axios";
import "./css/market.css";
import defaultImg from "../../assets/img/default.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MarketPost = () => {
  const navi = useNavigate();
  const { marketNo } = useParams();
  const [market, setMarket] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:80/markets/${marketNo}`)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));
  }, [marketNo]);

  // 게시글 삭제

  const handleDeleteMarket = () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:80/markets/delete/${marketNo}`)
        .then(() => {
          alert("삭제 성공!");
          navi("/market_list"); // 목록으로 이동
        })
        .catch((err) => {
          console.error(err);
          alert("삭제 실패!");
        });
    }
  };

  if (!market) return <p>로딩중...</p>;

  return (
    <>
      {market && (
        <div className="market-detail-content-wrap">
          <div className="market-detail-content">
            <div className="market-detail-content-left">
              <img
                src={
                  market.imageList?.[0]
                    ? `http://localhost:80${market.imageList[0].imgUrl}`
                    : defaultImg
                }
                alt="썸네일"
                className="market-thumbnail"
              />
            </div>
            <div className="market-detail-content-right">
              <div className="market-detail-top">
                <span className="market-detail-status ">
                  {market.marketStatusLabel}
                </span>
                <h2 className="market-title">{market.marketTitle}</h2>
              </div>
              <div className="market-detail-bottom">
                <div className="market-detail-meta">
                  <span className="market-writer">
                    {market.userName || "판매자"}
                  </span>
                  <em>|</em>
                  <span className="market-date">
                    {new Date(market.marketDate).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                <p className="market-price">
                  {market.marketPrice?.toLocaleString()}원
                </p>

                <p className="market-content-text">{market.marketContent}</p>
              </div>
            </div>
          </div>
          <div className="market-detail-content-img">
            {[0, 1, 2].map((i) => (
              <img
                key={i}
                src={
                  market.imageList?.[i]
                    ? `http://localhost:80${market.imageList[i].imgUrl}`
                    : defaultImg
                }
                alt={`상세 이미지 ${i}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="market-detail-buttons">
        <button className="btn market-btn">신고</button>
        <button className="btn market-btn" onClick={() => navi(`/market_list`)}>
          목록
        </button>
        <button
          className="btn market-btn"
          onClick={() => navi(`/markets/edit/${market.marketNo}`)}
        >
          수정
        </button>
        <button className="btn market-btn" onClick={handleDeleteMarket}>
          삭제
        </button>
      </div>
    </>
  );
};
export default MarketPost;
