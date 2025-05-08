import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Wrapper,
  HeaderRow,
  Title,
  ContentDiv,
  ContentTitle,
  ContentDate,
  ContentDetail,
  BackBtn,
} from "../../TableStyle/Table.style";
import styled from "styled-components";

const MileageDetail = () => {
  const { mileageSeq } = useParams();
  const navigate = useNavigate();
  const [mileage, setMileage] = useState(null);
  const [showCategory, setShowCategory] = useState(false);
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [point, setPoint] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        const res = await axios.get(
          `http://localhost:8080/admin/mileages/${mileageSeq}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
            },
          }
        );
        setMileage(res.data);
      } catch (err) {
        console.error("마일리지 상세 불러오기 실패", err);
      }
    };

    fetchDetail();
  }, [mileageSeq]);

  const handleApproveClick = () => {
    setShowCategory(true);
    setShowRejectReason(false);
  };

  const handleRejectClick = () => {
    setShowCategory(false);
    setShowRejectReason(true);
  };

  const handleGivePoint = async () => {
    if (!point) {
      alert("포인트를 입력하세요.");
      return;
    }

    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.post(
        `http://localhost:8080/admin/mileages/${mileageSeq}/status`,
        { point },
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
          },
        }
      );
      console.log(point);
      alert("포인트가 지급되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("포인트 지급 실패", err);
      alert("포인트 지급 중 오류가 발생했습니다.");
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectReason.trim()) {
      alert("반려 사유를 입력하세요.");
      return;
    }

    try {
      const token = sessionStorage.getItem("accessToken");
      await axios.post(
        `http://localhost:8080/admin/mileages/${mileageSeq}/status`,
        {
          reason: rejectReason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("반려 처리되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error("반려 처리 실패", err);
      alert("반려 처리 중 오류가 발생했습니다.");
    }
  };

  if (!mileage) return <Wrapper>로딩 중...</Wrapper>;

  return (
    <Wrapper>
      <HeaderRow>
        <Title>{mileage.userName} 님의 마일리지 신청</Title>
      </HeaderRow>

      <ContentDiv>
        <HeaderRow>
          <ContentTitle>{mileage.mileageTitle || "제목 없음"}</ContentTitle>
          <ContentDate>No: {mileage.createDate}</ContentDate>
        </HeaderRow>
        <hr />
        <ContentDetail>
          <div>{mileage.mileageCategory || "카테고리 없음"}</div>
          {mileage.mileageImg ? (
            <div style={{ marginTop: "2rem" }}>
              <img
                src={`http://localhost:8080${mileage.mileageImg}`}
                alt="마일리지 이미지"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            </div>
          ) : (
            <p>이미지가 없습니다.</p>
          )}
          <div style={{ marginTop: "1rem" }}>
            {mileage.mileageContent || "내용이 없습니다."}
          </div>
          <br />
          <strong>상태:</strong>{" "}
          {mileage.challengeStatus === "Y" ? "답변완료" : "확인중"}
        </ContentDetail>
      </ContentDiv>

      <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>

      <ActionButtonRow>
        <ActionBtn onClick={handleApproveClick}>지급하기</ActionBtn>
        <ActionBtn onClick={handleRejectClick}>반려하기</ActionBtn>
      </ActionButtonRow>

      {showCategory && (
        <>
          <CategorySelect>{mileage.mileageCategory}</CategorySelect>

          <PointInput>
            <label>지급할 포인트: </label>
            <input
              type="number"
              placeholder="숫자를 입력하세요"
              value={point}
              onChange={(e) => setPoint(e.target.value)}
            />
            <SubmitBtn onClick={handleGivePoint}>포인트 지급하기</SubmitBtn>
          </PointInput>
        </>
      )}

      {showRejectReason && (
        <RejectInput>
          <label>반려 사유: </label>
          <input
            type="text"
            placeholder="반려 사유를 입력하세요"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <SubmitBtn onClick={handleRejectSubmit}>반려 처리</SubmitBtn>
        </RejectInput>
      )}
    </Wrapper>
  );
};

export default MileageDetail;

const ActionButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ActionBtn = styled.button`
  padding: 0.5rem 1.2rem;
  background-color: #2c6e49;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #235437;
  }
`;

const CategorySelect = styled.div`
  margin-top: 1rem;
  select {
    padding: 0.5rem;
    font-size: 1rem;
  }
`;

const PointInput = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 150px;
  }
`;

const RejectInput = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
    width: 300px;
  }
`;

const SubmitBtn = styled.button`
  padding: 0.5rem 1.2rem;
  background-color: #bd1e1e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background-color: #a11414;
  }
`;
