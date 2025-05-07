import axios from "axios";
import defaultImg from "../../assets/img/default.jpg";
import { useNavigate } from "react-router-dom";
import "./css/market.css";
import { useEffect, useState } from "react";

const MarketList = () => {
  const [marketList, setMarketList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const startPage = 0;
  const endPage = totalPages;

  const navi = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost/markets");
        setMarketList(res.data);
        setFilteredList(res.data);
      } catch (err) {
        console.error("리스트 조회 실패 :", err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = () => {
    const result = marketList.filter((item) =>
      item.marketTitle.toLowerCase().includes(keyword.toLowerCase())
    );
    setFilteredList(result);
    setPage(0);
  };

  const resetSearch = () => {
    setKeyword("");
    setFilteredList(marketList);
    setPage(0);
  };

  const goToPage = (pageNum) => {
    setPage(pageNum);
  };

  const paginatedList = filteredList.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <>
      <h1 className="page-title">중고거래</h1>

      <div className="btn-wrap text-align-end search-box market-search">
        <input
          type="text"
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <button className="search-button market-btn" onClick={handleSearch}>
          검색
        </button>
        <button className="search-button market-btn" onClick={resetSearch}>
          초기화
        </button>
        <button
          className="btn market-btn btn-write"
          onClick={() => {
            const token = sessionStorage.getItem("accessToken");
            if (!token) {
              alert("로그인 후 이용해주세요.");
              navi("/login");
              return;
            }
            navi("/marketform");
          }}
        >
          글쓰기
        </button>
      </div>

      <div className="market-gallery">
        <ul className="gallery-list no-list">
          {paginatedList.map((item, idx) => (
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
          ))}
        </ul>
      </div>

      {/* 결과 없음 메시지 */}
      {filteredList.length === 0 && (
        <div className="no-result-message">검색 결과가 없습니다.</div>
      )}
      {/* 페이지네이션 */}
      {filteredList.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(0)} disabled={page === 0}>
            ≪
          </button>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
          >
            &lt;
          </button>

          {Array.from({ length: endPage - startPage }, (_, i) => (
            <button
              key={startPage + i}
              onClick={() => goToPage(startPage + i)}
              className={page === startPage + i ? "active" : ""}
            >
              {startPage + i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
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

export default MarketList;
