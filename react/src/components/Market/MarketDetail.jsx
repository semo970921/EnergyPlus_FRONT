import axios from "axios";
import "./css/market.css";
import defaultImg from "../../assets/img/default.jpg";
import React, { useState } from "react";

const MarketDetail = () => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  return (
    <>
      <div className="market-container">
        <h1 className="page-title">중고거래</h1>
        <div className="market-detail-content">
          <div className="market-detail-content-left">
            <img src={defaultImg} alt="썸네일" className="market-thumbnail" />
          </div>
          <div className="market-detail-content-right">
            <div className="market-detail-top">
              <span className="market-detail-status ">판매중</span>
              <h2 className="market-title">중고 냉장고 팝니다</h2>
            </div>
            <div className="market-detail-bottom">
              <div className="market-detail-meta">
                <span className="market-writer">김진솔</span>
                <em>|</em>
                <span className="market-date">2025.04.18</span>
              </div>
              <p className="market-price">120,000원</p>

              <p className="market-content-text">
                서울 강남 직거래 가능합니다. 상태 좋아요.
              </p>
            </div>
          </div>
        </div>

        <div className="market-detail-buttons">
          <button className="btn market-btn">게시글 신고</button>
          <button className="btn market-btn">목록</button>
          <button className="btn market-btn">수정</button>
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
                    <textarea
                      placeholder="답글을 입력하세요"
                      className="reply-input"
                    ></textarea>
                    <button type="submit" className="btn market-btn">
                      답글 등록
                    </button>
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
