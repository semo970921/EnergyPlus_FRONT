import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/market.css";

const MarketForm = () => {
  const navigate = useNavigate();
  const { marketNo } = useParams();
  const isEdit = !!marketNo;

  const [formData, setFormData] = useState({
    marketTitle: "",
    marketContent: "",
    marketPrice: "",
  });
  const [images, setImages] = useState([]); // 새로 선택된 이미지
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지
  const [deletedImages, setDeletedImages] = useState([false, false, false]);

  useEffect(() => {
    if (isEdit) {
      axios.get(`http://localhost:80/markets/${marketNo}`).then((res) => {
        const { marketTitle, marketContent, marketPrice, imageList } = res.data;
        setFormData({ marketTitle, marketContent, marketPrice });
        setExistingImages(imageList);
      });
    }
  }, [isEdit, marketNo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleDeleteImage = (index) => {
    const newDeleted = [...deletedImages];
    newDeleted[index] = true;
    setDeletedImages(newDeleted);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEdit && images.length !== 3) {
      alert("이미지는 3장 등록해야 합니다.");
      return;
    }

    const form = new FormData();
    const market = new Blob(
      [
        JSON.stringify({
          ...formData,
          marketNo: isEdit ? marketNo : undefined,
        }),
      ],
      { type: "application/json" }
    );

    form.append("market", market);

    images.forEach((img) => {
      if (img) form.append("images", img);
    });

    const url = isEdit
      ? "http://localhost:80/markets/update"
      : "http://localhost:80/markets/write";

    axios[isEdit ? "put" : "post"](url, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        alert(isEdit ? "수정 성공!" : "등록 성공!");
        const newMarketNo = isEdit ? marketNo : res.data.marketNo;
        navigate(`/markets/${newMarketNo}`);
      })
      .catch((err) => {
        console.error(err);
        alert("처리 실패");
      });
  };

  return (
    <div className="market-container">
      <h1 className="page-title">중고거래 {isEdit ? "수정" : "등록"}</h1>
      <form
        onSubmit={handleSubmit}
        className="market-form"
        encType="multipart/form-data"
      >
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
          <label key={i} className="label-flex">
            <div>
              {i === 0 ? "썸네일" : `${i}번째 상세 이미지`}{" "}
              <em className="text-danger">*</em>
            </div>
            {!deletedImages[i] && existingImages[i] && !images[i] && (
              <div className="image-box" onClick={() => handleDeleteImage(i)}>
                <img
                  src={`http://localhost${existingImages[i].imgUrl}`}
                  alt={`기존 이미지 ${i}`}
                  style={{ width: "120px", marginBottom: "8px" }}
                />
                <button type="button" className="img-delete-btn">
                  ✕
                </button>
              </div>
            )}
            {(deletedImages[i] || !existingImages[i] || images[i]) && (
              <input
                type="file"
                name={`image-${i}`}
                accept="image/*"
                onChange={(e) => handleImageChange(e, i)}
                required={!isEdit}
              />
            )}
          </label>
        ))}

        <button type="submit" className="btn market-btn">
          {isEdit ? "수정하기" : "등록하기"}
        </button>
      </form>
    </div>
  );
};

export default MarketForm;
