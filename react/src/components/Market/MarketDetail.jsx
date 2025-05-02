import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/market.css";
import MarketComment from "./MarketComment";
import defaultImg from "../../assets/img/default.jpg";

const MarketDetail = () => {
  const { marketNo } = useParams();
  const navigate = useNavigate();
  const [market, setMarket] = useState(null);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    fetchMarket();
  }, [marketNo]);

  const fetchMarket = () => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    axios
      .get(`http://localhost:80/markets/${marketNo}`, config)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));
  };

  const handleDeleteMarket = () => {
    if (window.confirm("정말 이 게시글을 삭제하시겠습니까?")) {
      axios
        .delete(`http://localhost:80/markets/delete/${marketNo}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("삭제 성공!");
          navigate("/market_list");
        })
        .catch((err) => {
          console.error(err);
          alert("삭제 실패!");
        });
    }
  };

  const handleReport = async () => {
    const reason = prompt("신고 사유를 입력하세요:");

    if (!reason || reason.trim() === "") {
      alert("신고 사유를 입력해야 합니다!");
      return;
    }

    const userId = sessionStorage.getItem("userId"); // 로그인할 때 저장해놨던 유저 ID 꺼내기

    try {
      await axios.post(
        "http://localhost:80/markets/report",
        {
          marketNo, // 신고 대상 게시글 번호
          reportReason: reason, // 입력한 신고 사유
          reporterUserId: userId, // 신고한 사람 ID
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("신고가 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("신고에 실패했습니다.");
    }
  };

  if (!market) return <p>로딩중...</p>;

  return (
    <div className="market-container">
      <h1 className="page-title">중고거래</h1>

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
              <span className="market-detail-status">
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

        {/* 추가 이미지 */}
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

      {/* 수정, 삭제 버튼 */}
      <div className="market-detail-buttons">
        {!market.isMine && (
          <button className="btn market-btn" onClick={handleReport}>
            신고
          </button>
        )}
        <button
          className="btn market-btn"
          onClick={() => navigate("/market_list")}
        >
          목록
        </button>
        {market.isMine && (
          <>
            <button
              className="btn market-btn"
              onClick={() => navigate(`/markets/edit/${market.marketNo}`)}
            >
              수정
            </button>
            <button className="btn market-btn" onClick={handleDeleteMarket}>
              삭제
            </button>
          </>
        )}
      </div>

      {/* 댓글/대댓글 컴포넌트 */}
      <MarketComment marketNo={marketNo} />
    </div>
  );
};

export default MarketDetail;
