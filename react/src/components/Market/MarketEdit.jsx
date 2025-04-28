import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/market.css";

const MarketEdit = () => {
  const { marketNo } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    marketTitle: "",
    marketContent: "",
    marketPrice: "",
    marketStatus: "N", // ← 초기값 추가
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([false, false, false]);
  const token = sessionStorage.getItem("accessToken");

  // 게시글 데이터 불러오기
  useEffect(() => {
    axios
      .get(`http://localhost:80/markets/${marketNo}`)
      .then((res) => {
        const {
          marketTitle,
          marketContent,
          marketPrice,
          marketStatus,
          imageList,
        } = res.data;
        setFormData({ marketTitle, marketContent, marketPrice, marketStatus });
        setExistingImages(imageList);
      })
      .catch((err) => console.error(err));
  }, [marketNo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const sendData = new FormData();

    // market 관련 필드 직접 추가!
    sendData.append("marketNo", marketNo);
    sendData.append("marketTitle", formData.marketTitle);
    sendData.append("marketContent", formData.marketContent);
    sendData.append("marketPrice", formData.marketPrice);
    sendData.append("marketStatus", formData.marketStatus);

    // 순서 유지하면서 keepImageUrls 각각 추가
    const keepImageUrls = existingImages.map((img, idx) => {
      if (!deletedImages[idx] && img) {
        return img.imgUrl;
      } else {
        return "";
      }
    });

    // keepImageUrls 배열 통째로 추가
    sendData.append("keepImageUrls", JSON.stringify(keepImageUrls));

    // 또는 하나씩
    keepImageUrls.forEach((url, idx) => {
      sendData.append(`keepImageUrls[${idx}]`, url ? url : "");
    });

    // 새로 선택한 이미지 추가
    images.forEach((img) => {
      if (img) sendData.append("images", img);
    });

    // FormData 확인
    for (let [key, value] of sendData.entries()) {
      console.log("FormData Key:", key, "Value:", value);
    }

    // 확인용 콘솔 로그
    for (let [key, value] of sendData.entries()) {
      console.log(key, value);
    }

    axios
      .put("http://localhost:80/markets/update", sendData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alert("수정 성공!");
        navigate(`/markets/${marketNo}`);
      })
      .catch((err) => {
        console.error(err);
        alert("수정 실패");
      });
  };
  return (
    <div className="market-container">
      <h1 className="page-title">게시글 수정</h1>
      <form
        onSubmit={handleSubmit}
        className="market-form"
        encType="multipart/form-data"
      >
        <label>판매상태</label>
        <select
          name="marketStatus"
          value={formData.marketStatus}
          onChange={handleChange}
        >
          <option value="N">판매중</option>
          <option value="Y">판매완료</option>
        </select>

        <label className="label-flex">
          <div>
            제목 <em className="text-danger">*</em>
          </div>
          <input
            type="text"
            name="marketTitle"
            value={formData.marketTitle}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            가격 <em className="text-danger">*</em>
          </div>
          <input
            type="number"
            name="marketPrice"
            value={formData.marketPrice}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            내용 <em className="text-danger">*</em>
          </div>
          <textarea
            name="marketContent"
            value={formData.marketContent}
            onChange={handleChange}
            required
          />
        </label>

        {[0, 1, 2].map((i) => (
          <label key={i} className="label-flex img-label">
            <div>
              {i === 0 ? "썸네일" : `${i}번째 상세 이미지`}
              <em className="text-danger">*</em>
            </div>

            {/* 기존 이미지 보여주기 */}

            {!deletedImages[i] && existingImages[i] && !images[i] && (
              <div className="image-box">
                <img
                  src={`http://localhost${existingImages[i].imgUrl}`}
                  alt={`기존 이미지 ${i}`}
                />
                <button
                  className="img-delete-btn"
                  type="button"
                  onClick={() => {
                    const newDel = [...deletedImages];
                    newDel[i] = true;
                    setDeletedImages(newDel);
                  }}
                >
                  ✕
                </button>
              </div>
            )}

            {/* 삭제했거나 기존 이미지가 없으면 input 보여줌 */}
            {(deletedImages[i] || !existingImages[i]) && (
              <input
                type="file"
                name={`image-${i}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, i)}
              />
            )}
          </label>
        ))}

        <button type="submit" className="btn market-btn">
          수정 완료
        </button>
      </form>
    </div>
  );
};

export default MarketEdit;
