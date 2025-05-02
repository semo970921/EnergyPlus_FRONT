import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineSubdirectoryArrowRight } from "react-icons/md";

const MarketComment = ({ marketNo }) => {
  const token = sessionStorage.getItem("accessToken");

  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyTargetCommentNo, setReplyTargetCommentNo] = useState(null);
  const [editingReplyNo, setEditingReplyNo] = useState(null);
  const [editingReplyContent, setEditingReplyContent] = useState("");

  useEffect(() => {
    fetchComments();
  }, [marketNo]);

  const fetchComments = () => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    axios
      .get(`http://localhost:80/markets/comments/${marketNo}`, config)
      .then((res) => {
        setComments(res.data);
        fetchRepliesForAllComments(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchRepliesForAllComments = (comments) => {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : {};

    const allReplies = [];
    Promise.all(
      comments.map((c) =>
        axios
          .get(`http://localhost:80/markets/reply/${c.marketCommentNo}`, config)
          .then((res) => allReplies.push(...res.data))
      )
    )
      .then(() => setReplies(allReplies))
      .catch((err) => console.error(err));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:80/markets/comments",
        { marketNo, marketCommentContent: commentContent },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setCommentContent("");
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 등록 실패");
      });
  };

  const handleCommentUpdate = (commentId) => {
    axios
      .put(
        "http://localhost:80/markets/comments",
        { marketCommentNo: commentId, marketCommentContent: editingContent },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditingCommentId(null);
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("댓글 수정 실패");
      });
  };

  const handleCommentDelete = (commentId) => {
    axios
      .delete(`http://localhost:80/markets/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchComments())
      .catch((err) => {
        console.error(err);
        alert("댓글 삭제 실패");
      });
  };

  const handleCommentReport = async (marketCommentNo) => {
    const reason = prompt("댓글 신고 사유를 입력하세요:");
    const userId = sessionStorage.getItem("userId");

    if (!reason || reason.trim() === "") {
      alert("신고 사유를 입력해야 합니다!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:80/markets/commentReport",
        {
          marketCommentNo,
          commentReportReason: reason,
          reporterUserId: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("댓글 신고가 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("댓글 신고에 실패했습니다.");
    }
  };

  const handleReplySubmit = (e, commentNo) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:80/markets/reply/write",
        { replyContent, marketCommentNo: commentNo },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setReplyContent("");
        setReplyTargetCommentNo(null);
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("답글 등록 실패");
      });
  };

  const handleReplyUpdate = (replyNo) => {
    axios
      .put(
        "http://localhost:80/markets/reply/update",
        { replyNo, replyContent: editingReplyContent },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setEditingReplyNo(null);
        fetchComments();
      })
      .catch((err) => {
        console.error(err);
        alert("답글 수정 실패");
      });
  };

  const handleReplyDelete = (replyNo) => {
    axios
      .delete(`http://localhost:80/markets/reply/${replyNo}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchComments())
      .catch((err) => {
        console.error(err);
        alert("답글 삭제 실패");
      });
  };

  const handleReplyReport = async (replyNo) => {
    const reason = prompt("답글 신고 사유를 입력하세요:");
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("accessToken");

    if (!reason || reason.trim() === "") {
      alert("신고 사유를 입력해야 합니다!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:80/markets/replyReport",
        {
          replyNo,
          replyReportReason: reason,
          reporterUserId: userId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("답글 신고가 완료되었습니다!");
    } catch (error) {
      console.error(error);
      alert("답글 신고에 실패했습니다.");
    }
  };

  return (
    <div className="comment-section">
      <h3>댓글</h3>

      {/* 댓글 작성 폼 */}
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

      {/* 댓글 리스트 */}
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.marketCommentNo} className="comment-item">
            <div className="comment-meta">
              <div className="comment-meta-left">
                <span className="comment-writer">{comment.userName}</span>
                <em className="line">|</em>
                <span className="comment-date">
                  {new Date(comment.marketCommentDate).toLocaleDateString(
                    "ko-KR"
                  )}
                </span>
              </div>
              {!comment.isMine && (
                <button
                  className="btn btn-danger btn-no-line"
                  onClick={() => handleCommentReport(comment.marketCommentNo)}
                >
                  신고
                </button>
              )}
            </div>

            <div className="comment-content-wrap">
              {editingCommentId === comment.marketCommentNo ? (
                <div className="edit-form">
                  <textarea
                    className="comment-input"
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                  />
                  <div className="btn-wrap">
                    <button
                      className="btn-sm"
                      onClick={() =>
                        handleCommentUpdate(comment.marketCommentNo)
                      }
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
                    {comment.marketCommentContent}
                  </p>
                  <div className="btn-wrap">
                    {comment.isMine && (
                      <>
                        <button
                          className="btn-sm"
                          onClick={() => {
                            setEditingCommentId(comment.marketCommentNo);
                            setEditingContent(comment.marketCommentContent);
                          }}
                        >
                          수정
                        </button>
                        <button
                          className="btn-sm"
                          onClick={() =>
                            handleCommentDelete(comment.marketCommentNo)
                          }
                        >
                          삭제
                        </button>
                      </>
                    )}
                    <button
                      className="btn-sm"
                      onClick={() =>
                        setReplyTargetCommentNo(comment.marketCommentNo)
                      }
                    >
                      답글
                    </button>
                  </div>
                </>
              )}

              {/* 답글 입력 폼 */}
              {replyTargetCommentNo === comment.marketCommentNo && (
                <form
                  className="reply-form"
                  onSubmit={(e) =>
                    handleReplySubmit(e, comment.marketCommentNo)
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

              {/* 답글 리스트 */}
              <ul className="reply-list">
                {replies
                  .filter((r) => r.marketCommentNo === comment.marketCommentNo)
                  .map((reply) => (
                    <li key={reply.replyNo} className="reply-item">
                      <div className="reply-item-left">
                        <MdOutlineSubdirectoryArrowRight />
                      </div>
                      <div className="reply-item-right">
                        <div className="reply-meta">
                          <div className="reply-meta-left">
                            <span className="reply-writer">
                              {reply.userName}
                            </span>
                            <em className="line">|</em>
                            <span className="reply-date">
                              {new Date(reply.replyDate).toLocaleDateString(
                                "ko-KR"
                              )}
                            </span>
                          </div>
                          {!reply.isMine && (
                            <button
                              className="btn btn-danger btn-no-line"
                              onClick={() => handleReplyReport(reply.replyNo)}
                            >
                              신고
                            </button>
                          )}
                        </div>

                        <div className="reply-content-wrap">
                          {editingReplyNo === reply.replyNo ? (
                            <>
                              <input
                                value={editingReplyContent}
                                onChange={(e) =>
                                  setEditingReplyContent(e.target.value)
                                }
                              />
                              <div className="btn-wrap">
                                <button
                                  className="btn-sm"
                                  onClick={() =>
                                    handleReplyUpdate(reply.replyNo)
                                  }
                                >
                                  저장
                                </button>
                                <button
                                  className="btn-sm"
                                  onClick={() => setEditingReplyNo(null)}
                                >
                                  취소
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <p className="reply-content">
                                {reply.replyContent}
                              </p>
                              {reply.isMine && (
                                <div className="reply-btn-wrap">
                                  <button
                                    className="btn-sm"
                                    onClick={() => {
                                      setEditingReplyNo(reply.replyNo);
                                      setEditingReplyContent(
                                        reply.replyContent
                                      );
                                    }}
                                  >
                                    수정
                                  </button>
                                  <button
                                    className="btn-sm"
                                    onClick={() =>
                                      handleReplyDelete(reply.replyNo)
                                    }
                                  >
                                    삭제
                                  </button>
                                </div>
                              )}
                            </>
                          )}
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
  );
};

export default MarketComment;
