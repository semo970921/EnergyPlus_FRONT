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
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:80/markets/${marketNo}`)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));
  }, [marketNo]);

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

  const fetchComments = () => {
    axios
      .get(`http://localhost:80/markets/comments/${marketNo}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchComments();
  }, [marketNo]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:80/markets/comments", {
        marketNo: marketNo,
        userId: 1,
        marketCommentContent: commentContent,
      })
      .then(() => {
        alert("댓글 등록 성공!");
        setCommentContent(""); // 입력창 초기화
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 등록 실패");
      });
  };

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.marketCommentNo);
    setEditingContent(comment.marketCommentContent);
  };

  const handleUpdate = (commentId, e) => {
    if (e) e.preventDefault();
    axios
      .put("http://localhost:80/markets/comments", {
        marketCommentNo: commentId,
        marketCommentContent: editingContent,
      })
      .then(() => {
        alert("수정 완료!");
        setEditingCommentId(null);
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("수정 실패!");
      });
  };

  const handleDelete = (commentId) => {
    axios
      .get(`http://localhost:80/markets/comments/delete/${commentId}?userId=1`)
      .then(() => {
        alert("댓글 삭제 완료!");
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 삭제 실패!");
      });
  };

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
          <button className="btn market-btn" onClick={handleDeleteMarket}>
            삭제
          </button>
        </div>
        <div className="comment-section">
          <h3>댓글</h3>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <label>
              <input type="checkbox" className="secret-checkbox" />
              비밀댓글
            </label>
            <div className="comment-form-field">
              <textarea
                placeholder="댓글을 입력하세요"
                className="comment-input"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              ></textarea>
              <button type="submit" className="btn market-btn submit-btn">
                등록
              </button>
            </div>
          </form>

          <ul className="comment-list">
            {comments.map((c) => (
              <li key={c.marketCommentNo} className="comment-item">
                <div className="comment-meta">
                  <div className="comment-meta-left">
                    <span className="comment-writer">{c.userName}</span>
                    <em className="line">|</em>
                    <span className="comment-date">
                      {new Date(c.marketCommentDate).toLocaleDateString(
                        "ko-KR"
                      )}
                    </span>
                  </div>

                  <button className="btn btn-danger btn-no-line">신고</button>
                </div>

                <div className="comment-content-wrap">
                  {editingCommentId === c.marketCommentNo ? (
                    <div className="edit-form">
                      <textarea
                        className="comment-input"
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                      <div className="btn-wrap">
                        <button
                          className="btn-sm"
                          onClick={(e) => handleUpdate(c.marketCommentNo, e)}
                        >
                          저장
                        </button>
                        <button
                          className="btn-sm"
                          onClick={() => setEditingCommentId(null)}
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="comment-content">
                        {c.marketCommentContent}
                      </p>
                      <div className="btn-wrap">
                        <button
                          className="btn-sm"
                          onClick={() => handleEditClick(c)}
                        >
                          수정
                        </button>
                        <button
                          className="btn-sm"
                          onClick={() => handleDelete(c.marketCommentNo)}
                        >
                          삭제
                        </button>
                        <button
                          className="btn-sm"
                          onClick={() => setShowReplyForm(!showReplyForm)}
                        >
                          답댓글
                        </button>
                      </div>
                    </>
                  )}

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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* reply-list
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

                    <button className="btn btn-danger btn-no-line">신고</button>
                  </div>
                  <div className="reply-content-wrap">
                    <p className="reply-content">네 어디서 하실까요?</p>
                  </div>
                </div>
              </li>
            </ul> 
             reply-list */}
    </>
  );
};
export default MarketDetail;
