import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../Market/css/market.css";
import defaultImg from "../../../assets/img/default.jpg";
import { BackBtn } from "../../TableStyle/Table.style";


const MypageMarket = () => {

  const [marketList, setMarketList] = useState([]);
  const navi = useNavigate();

  // 토큰
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    axios.get("http://localhost/mymarket", {
      headers: {
        Authorization: `Bearer ${token}`, // 토큰 추가
      },
    })
      .then((response) => {
        setMarketList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <>
      <h1 className="page-title">나의 게시글</h1>
      {marketList.length === 0 ? (
        <div className="no-data">
          <p>등록된 게시글이 없습니다.</p> {/* 글이 없을 때 */}
        </div>
      ) : (
        <div className="market-gallery">
          <ul className="gallery-list no-list">
            {marketList.map((item, idx) => (
              <li
                className="gallery-item"
                key={item.marketNo || idx}
                onClick={() => navi(`/mypage_market/${item.marketNo}`)}
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
                      {item.marketPrice != null ? item.marketPrice.toLocaleString() : "가격 미정"}원
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
      )}
      <BackBtn onClick={() => navi("/mypage_main")}>뒤로가기</BackBtn>
    </>
  );
};

export default MypageMarket;

