import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import {
  Wrapper,
  HeaderRow,
  Title,
  StyledTable,
  BackBtn,
} from "../../TableStyle/Table.style";

const AdminChallenges = () => {
  const [participations, setParticipations] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    const fetchParticipations = async () => {
      try {
        const res = await axios.get(
          "http://localhost/admin/challenges",
          {
            params: { page: 0 },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("📦 챌린지 참여 응답:", res.data);
        setParticipations(res.data);
      } catch (err) {
        console.error("❌ 챌린지 참여 목록 불러오기 실패:", err);
        setParticipations([]);
      }
    };

    fetchParticipations();
  }, [token]);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <Wrapper style={{ flex: 1 }}>
        <HeaderRow>
          <Title>🏁 챌린지 참여 내역</Title>
        </HeaderRow>

        <StyledTable>
          <thead>
            <tr>
              <th>No</th>
              <th>제목</th>
              <th>작성자</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {participations.length > 0 ? (
              participations.map((p, idx) => (
                <tr key={p.challengeSeq}>
                  <td>{idx + 1}</td>
                  <td onClick={() => navigate(`/admin/challenges/${p.challengeSeq}`)} style={{ cursor: "pointer" }}>
                    {p.challengeTitle}</td>
                  <td>{p.userName}</td>
                  <td>
                    {p.challengeStatus === "N" ? "대기" : p.challengeStatus === "Y" ? "승인" : "반려"}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        navigate(`/admin/challenges/${p.challengeSeq}`)
                      }
                    >
                      상세
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#888" }}>
                  등록된 챌린지 참여 내역이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </StyledTable>

        <BackBtn onClick={() => navigate(-1)}>뒤로가기</BackBtn>
      </Wrapper>
    </div>
  );
};

export default AdminChallenges;