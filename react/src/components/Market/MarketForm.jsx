import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./css/market.css";

const MarketForm = () => {
  const navigate = useNavigate();
  const { marketNo } = useParams();
  const isEdit = !!marketNo;
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwidXNlckVtYWlsIjoia3lzbWFuMjU4MEBuYXZlci5jb20iLCJpYXQiOjE3NDU1NDA4NDgsImV4cCI6MTc0NTU0MjY0OH0.E3i1NKfqFYy5MD-K372Rim7siyh5UXy7MmqE5vvYSgqwKbf_xnAy3h0BbeE3FRPU_ukOfKjauYPXCO9NweEmaA";

  const [formData, setFormData] = useState({
    marketTitle: "",
    marketContent: "",
    marketPrice: "",
  });
  const [images, setImages] = useState([]); // 새로 선택된 이미지
  const [existingImages, setExistingImages] = useState([]); // 기존 이미지
  const [deletedImages, setDeletedImages] = useState([false, false, false]);

  // Edit 시 기존 데이터 불러오기
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:80/markets/${marketNo}`)
        .then((res) => {
          const { marketTitle, marketContent, marketPrice, imageList } =
            res.data;
          setFormData({ marketTitle, marketContent, marketPrice });
          setExistingImages(imageList);
        })
        .catch((err) => console.error(err));
    }
  }, [isEdit, marketNo]);

  // 입력값 변경
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 이미지 변경
  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  // 기존 이미지 삭제 처리
  const handleDeleteImage = (index) => {
    const newDeleted = [...deletedImages];
    newDeleted[index] = true;
    setDeletedImages(newDeleted);
  };

  // 등록

  const submitMarket = (form, url) => {
    axios
      .post(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert("등록 성공!");
        navigate(`/markets/${res.data.marketNo}`);
      })
      .catch((err) => {
        console.error(err);
        alert("등록 실패");
      });
  };

  // 수정
  const updateMarket = (form, url) => {
    axios
      .put(url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
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

  // 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEdit && images.length !== 3) {
      alert("이미지는 3장 등록해야 합니다.");
      return;
    }

    const form = new FormData();
    form.append("marketTitle", formData.marketTitle);
    form.append("marketContent", formData.marketContent);
    form.append("marketPrice", formData.marketPrice);

    images.forEach((img) => {
      if (img) form.append("images", img);
    });
    if (isEdit) {
      form.append("marketNo", marketNo);
    }

    const url = isEdit
      ? "http://localhost:80/markets/update"
      : "http://localhost:80/markets/write";

    if (isEdit) {
      updateMarket(form, url);
    } else {
      submitMarket(form, url);
    }
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
