import axios from "axios";
import { useState } from "react";

const CardNewsForm = () => {
  const [formData, setFormData] = useState({
    cardnewsTitle: "",
    cardnewsContent: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("cardnewsTitle", formData.cardnewsTitle);
    data.append("cardnewsContent", formData.cardnewsContent);
    if (file) data.append("file", file);

    try {
      const token = sessionStorage.getItem("accessToken"); // 관리자 토큰
      await axios.post("http://localhost:80/admin/cardnews/form", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("카드뉴스 등록 완료!");
    } catch (err) {
      console.error(err);
      alert("등록 실패!");
    }
  };

  return (
    <div className="cardnews-container">
      <h1 className="page-title">카드뉴스 등록</h1>
      <form
        className="cardnews-form"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <label className="label-flex">
          <div>
            제목 <em className="text-danger">*</em>
          </div>
          <input
            type="text"
            name="cardnewsTitle"
            value={formData.cardnewsTitle}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            내용 <em className="text-danger">*</em>
          </div>
          <textarea
            name="cardnewsContent"
            value={formData.cardnewsContent}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            이미지 <em className="text-danger">*</em>
          </div>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </label>

        <button type="submit" className="btn cardnews-btn">
          등록하기
        </button>
      </form>
    </div>
  );
};

export default CardNewsForm;
