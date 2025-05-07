import React, { useEffect, useState } from "react";
import "./css/cardnews.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CardNewsList = () => {
  const [cardNewsList, setCardNewsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startPage = 0;
  const endPage = totalPages;

  const paginatedList = filteredList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  const navi = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:80/admin/cardnews/list?page=0")
      .then((res) => {
        console.log("받은 카드뉴스 데이터:", res.data);
        setCardNewsList(res.data);
        setFilteredList(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert("카드뉴스를 불러오는데 실패했습니다.");
      });
  }, []);

  return (
    <>
      <h1 className="page-title">카드뉴스</h1>
      <div className="main-section cardnew-gallery">
        {filteredList.length === 0 ? (
          <p className="no-cardnews">등록된 카드뉴스가 없습니다.</p>
        ) : (
          <ul className="gallery-list no-list">
            {paginatedList.map((item) => (
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

      {/* 페이지네이션 */}
      {filteredList.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(0)} disabled={page === 0}>
            ≪
          </button>
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
          >
            &lt;
          </button>

          {Array.from({ length: endPage - startPage }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={page === i ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page === totalPages - 1}
          >
            &gt;
          </button>
          <button
            onClick={() => setPage(totalPages - 1)}
            disabled={page === totalPages - 1}
          >
            ≫
          </button>
        </div>
      )}
    </>
  );
};

export default CardNewsList;
