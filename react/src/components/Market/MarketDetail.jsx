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
  const [replyContent, setReplyContent] = useState("");
  const [replyTargetCommentNo, setReplyTargetCommentNo] = useState(null);
  const [replies, setReplies] = useState([]);
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwidXNlckVtYWlsIjoia3lzbWFuMjU4MEBuYXZlci5jb20iLCJpYXQiOjE3NDU1NTc0NzMsImV4cCI6MTc0NTU1OTI3M30.m68L9s2n1YZkilWApLLAKSeKGzSsB8-1XHOH3ZMKVwPzMTJsnzInbB9UKSttJwtQY6fXbPOc084VIRa2dRgHnw";
  useEffect(() => {
    axios
      .get(`http://localhost:80/markets/${marketNo}`)
      .then((res) => setMarket(res.data))
      .catch((err) => console.error(err));

    fetchComments();
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

  // 댓글 유지

  const fetchComments = () => {
    axios
      .get(`http://localhost:80/markets/comments/${marketNo}`)
      .then((res) => {
        setComments(res.data);
        fetchRepliesForAllComments(res.data); // 댓글 받아오면, 대댓글도!
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // 댓글 등록

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:80/markets/comments",
        {
          marketNo: marketNo,
          marketCommentContent: commentContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

  // 댓글 수정 버튼

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.marketCommentNo);
    setEditingContent(comment.marketCommentContent);
  };

  // 댓글 수정

  const handleUpdate = (commentId, e) => {
    if (e) e.preventDefault();
    axios
      .put(
        "http://localhost:80/markets/comments",
        {
          marketCommentNo: commentId,
          marketCommentContent: editingContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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

  // 댓글 삭제

  const handleDelete = (commentId) => {
    axios
      .delete(`http://localhost:80/markets/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("댓글 삭제 완료!");
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 삭제 실패!");
      });
  };

  // 대댓글 등록
  const handleReplySubmit = (e, marketCommentNo) => {
    e.preventDefault();
    console.log("댓글 번호 확인: ", marketCommentNo);
    axios
      .post(
        "http://localhost:80/markets/reply/write",
        {
          replyContent: replyContent,
          marketCommentNo: marketCommentNo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        alert("답댓글 등록 성공!");
        setReplyContent(""); // 입력창 초기화
        setReplyTargetCommentNo(null); // 폼 닫기
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("답댓글 등록 실패!");
      });
  };

  // 대댓글 조회
  const fetchRepliesForAllComments = (comments) => {
    const allReplies = [];

    Promise.all(
      comments.map((c) =>
        axios
          .get(`http://localhost:80/markets/reply/${c.marketCommentNo}`)
          .then((res) => {
            // 각 댓글 번호 기준으로 replies 모아서 저장
            allReplies.push(...res.data);
          })
      )
    )
      .then(() => {
        console.log("All replies fetched:", allReplies);
        setReplies(allReplies); // 모든 대댓글 상태에 저장
      })
      .catch((err) => console.error(err));
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
                          onClick={() => {
                            setShowReplyForm(!showReplyForm);
                            setReplyTargetCommentNo(c.marketCommentNo);
                          }}
                        >
                          답댓글
                        </button>
                      </div>
                    </>
                  )}

                  {showReplyForm &&
                    replyTargetCommentNo === c.marketCommentNo && (
                      <form
                        className="reply-form"
                        onSubmit={(e) =>
                          handleReplySubmit(e, c.marketCommentNo)
                        }
                      >
                        <MdOutlineSubdirectoryArrowRight />
                        <div className="reply-form-right">
                          <textarea
                            placeholder="답글을 입력하세요"
                            className="reply-input"
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                          ></textarea>
                          <button type="submit" className="btn market-btn">
                            답글 등록
                          </button>
                        </div>
                      </form>
                    )}
                  <ul className="reply-list">
                    {replies
                      .filter((r) => r.marketCommentNo === c.marketCommentNo)
                      .map((r) => (
                        <li key={r.replyNo} className="reply-item">
                          <div className="reply-item-left">
                            {" "}
                            <MdOutlineSubdirectoryArrowRight />
                          </div>
                          <div className="reply-item-right">
                            <div className="reply-meta">
                              <div className="reply-meta-left">
                                <span className="reply-writer">
                                  {r.userName}
                                </span>
                                <em className="line">|</em>
                                <span className="reply-date">
                                  {new Date(r.replyDate).toLocaleDateString(
                                    "ko-KR"
                                  )}
                                </span>
                              </div>
                              <button className="btn btn-danger btn-no-line">
                                신고
                              </button>
                            </div>
                            <div className="reply-content-wrap">
                              <p className="reply-content">{r.replyContent}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default MarketDetail;
