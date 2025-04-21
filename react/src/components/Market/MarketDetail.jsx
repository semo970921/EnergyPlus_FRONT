import axios from "axios";
import "./css/market.css";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";
import defaultImg from "../../assets/img/default.jpg";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MarketDetail = () => {
  const navi = useNavigate();
  const { marketNo } = useParams();
  const [market, setMarket] = useState(null);
  const [showReplyForm, setShowReplyForm] = useState(false); // 💡 최상단에서 선언해야 함!

  useEffect(() => {
    axios
      .get(`http://localhost:80/markets/${marketNo}`)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));
  }, [marketNo]);

  if (!market) return <p>로딩중...</p>;

  return (
    <>
      <div className="market-container">
        <h1 className="page-title">중고거래</h1>
        {market && (
          <div className="market-detail-content-wrap">
            <div className="market-detail-content">
              <div className="market-detail-content-left">
                <img
                  src={
                    market.imageList?.[0]
                      ? `http://localhost${market.imageList[0].imgUrl}`
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
              <img
                src={
                  market.imageList?.[0]
                    ? `http://localhost${market.imageList[0].imgUrl}`
                    : defaultImg
                }
                alt=""
              />
              <img
                src={
                  market.imageList?.[0]
                    ? `http://localhost${market.imageList[1].imgUrl}`
                    : defaultImg
                }
                alt=""
              />
              <img
                src={
                  market.imageList?.[0]
                    ? `http://localhost${market.imageList[2].imgUrl}`
                    : defaultImg
                }
                alt=""
              />
            </div>
          </div>
        )}

        <div className="market-detail-buttons">
          <button className="btn market-btn">신고</button>
          <button
            className="btn market-btn"
            onClick={() => navi(`/market_list`)}
          >
            목록
          </button>
          <button
            className="btn market-btn"
            onClick={() => navi(`/markets/edit/${market.marketNo}`)}
          >
            수정
          </button>
        </div>
        <div className="comment-section">
          <h3>댓글</h3>

          <form className="comment-form">
            <label>
              <input type="checkbox" className="secret-checkbox" />
              비밀댓글
            </label>
            <div className="comment-form-field">
              <textarea
                placeholder="댓글을 입력하세요"
                className="comment-input"
              ></textarea>
              <button type="submit" className="btn market-btn submit-btn">
                등록
              </button>
            </div>
          </form>

          <ul className="comment-list">
            <li className="comment-item">
              <div className="comment-meta">
                <div className="comment-meta-left">
                  <span className="comment-writer">김진솔</span>
                  <em className="line">|</em>
                  <span className="comment-date">2025-04-18</span>
                </div>

                <button className="btn btn-danger btn-no-line">신고</button>
              </div>
              <div className="comment-content-wrap">
                <p className="comment-content">구매 원해요! 쪽지 드릴게요.</p>
                <div className="btn-wrap">
                  <button className="btn-sm">수정</button>
                  <button className="btn-sm">삭제</button>
                  <button
                    className="btn-sm"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                  >
                    답댓글
                  </button>
                </div>
                {showReplyForm && (
                  <form className="reply-form">
                    <MdOutlineSubdirectoryArrowRight />
                    <div className="reply-form-right">
                      <textarea
                        placeholder="답글을 입력하세요"
                        className="reply-input"
                      ></textarea>
                      <button type="submit" className="btn market-btn">
                        답글 등록
                      </button>
                    </div>
                  </form>
                )}
                <ul className="reply-list">
                  <li className="reply-item">
                    <div className="reply-item-left"></div>
                    <div className="reply-item-right">
                      <div className="reply-meta">
                        <div className="reply-meta-left">
                          <span className="reply-writer">김진솔</span>
                          <em className="line">|</em>
                          <span className="reply-date">2025-04-18</span>
                        </div>

                        <button className="btn btn-danger btn-no-line">
                          신고
                        </button>
                      </div>
                      <div className="reply-content-wrap">
                        <p className="reply-content">네 어디서 하실까요?</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default MarketDetail;
