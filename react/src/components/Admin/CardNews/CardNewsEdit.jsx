import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CardNewsEdit = () => {
  const { id } = useParams(); // ← 변수명 통일
  const navigate = useNavigate();

  const [form, setForm] = useState({
    cardNewsTitle: "",
    cardNewsContent: "",
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const userRole = sessionStorage.getItem("userRole");

    // 1. 권한 체크
    if (!accessToken || userRole !== "ROLE_ADMIN") {
      alert("접근 권한이 없습니다.");
      navigate("/");
      return;
    }

    // 2. 카드뉴스 데이터 불러오기
    axios
      .get(`http://localhost:80/admin/cardnews/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setForm({
          cardNewsTitle: res.data.cardNewsTitle,
          cardNewsContent: res.data.cardNewsContent,
        });
      })
      .catch((err) => {
        alert("카드뉴스 정보를 불러오는 데 실패했습니다.");
        console.error(err);
      });
  }, [id, navigate]);

  // 입력값 핸들링
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 파일 선택 핸들링
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 수정 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cardNewsTitle", form.cardNewsTitle);
    formData.append("cardNewsContent", form.cardNewsContent);
    if (file) {
      formData.append("file", file);
    }

    axios
      .put(`http://localhost:80/admin/cardnews/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        alert("카드뉴스 수정 완료!");
        navigate("/cardnews");
      })
      .catch((err) => {
        alert("수정 실패 😥");
        console.error(err);
        console.log(err.response);
      });
  };

  return (
    <div className="cardnews-container">
      <h1 className="page-title">카드뉴스 수정</h1>
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
            name="cardNewsTitle"
            value={form.cardNewsTitle}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            내용 <em className="text-danger">*</em>
          </div>
          <textarea
            name="cardNewsContent"
            value={form.cardNewsContent}
            onChange={handleChange}
            required
          />
        </label>

        <label className="label-flex">
          <div>
            이미지 <em className="text-danger">*</em>
          </div>
          <input type="file" name="file" onChange={handleFileChange} />
        </label>

        <div className="btn-group">
          <button type="submit" className="btn cardnews-btn">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardNewsEdit;
