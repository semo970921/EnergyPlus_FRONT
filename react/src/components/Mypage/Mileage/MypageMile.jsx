import { useSearchParams, useNavigate } from "react-router-dom";
import { Wrapper, HeaderRow, PageBtn, Pagination, SearchBox, SearchButton,
  SearchInput, StyledTable, Title, WriteButton, BackBtn } from "../../TableStyle/Table.style";
import { useEffect, useState } from "react";
import axios from "axios";

const MypageMile = () => {

  const navi = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRejectedId, setSelectedRejectedId] = useState(null); // 반려 사유

  // 더미 데이터
  const dummyData = [
    { qnaId: 4, qnaCate: "자전거", qnaPay: 1200, qnaDate: "2025.04.09", qnaStatus: "COMPLETE" },
    { qnaId: 3, qnaCate: "다회용기", qnaPay: 300, qnaDate: "2025.04.09", qnaStatus: "CANCEL" },
    { qnaId: 2, qnaCate: "다회용기", qnaPay: 400, qnaDate: "2025.04.09", qnaStatus: "COMPLETE" },
    {
      qnaId: 1,
      qnaCate: "자전거",
      qnaPay: 1000,
      qnaDate: "2025.04.09",
      qnaStatus: "REJECTED",
      rejectReason: "인증하신 사진 파일을 확인할 수 없습니다. 다시 신청해 주시기 바랍니다.",
    },
  ];

  const filteredData = selectedCategory
    ? dummyData.filter((qna) => qna.qnaCate === selectedCategory)
    : dummyData;

  // 취소하기 버튼 클릭 시 동작 (현재는 alert만)
  const handleCancel = (id) => {
    alert(`${id}번 신청이 취소되었습니다.`);
    // 여기에 axios.post 등 API 호출 연결 가능
  };

  return(
    <>
      <Wrapper>
      <HeaderRow>
        <Title>마일리지 신청 현황</Title>

        {/* 카테고리 선택 박스 */}
        <SearchBox>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="">카테고리 선택</option>
            <option value="자전거">자전거</option>
            <option value="다회용기">다회용기</option>
          </select>

          {selectedCategory && (
            <SearchButton onClick={() => setSelectedCategory("")}>초기화</SearchButton>
          )}

        </SearchBox>
      </HeaderRow>

      <StyledTable>
        <thead>
          <tr>
            <th>No</th>
            <th>카테고리</th>
            <th>마일리지 금액</th>
            <th>작성시간</th>
            <th>신청 현황</th>
          </tr>
        </thead>
        <tbody>
        {filteredData.map((qna) => (
            <tr key={qna.qnaId}>
              <td>{qna.qnaId}</td>
              <td>{qna.qnaCate}</td>
              <td>{qna.qnaPay}</td>
              <td>{qna.qnaDate}</td>
              <td>
                {qna.qnaStatus === "COMPLETE" && <span style={{ color: "gray" }}>지급완료</span>}
                {qna.qnaStatus === "CANCEL" && (
                  <SearchButton onClick={() => handleCancel(qna.qnaId)}>취소하기</SearchButton>
                )}
                {qna.qnaStatus === "REJECTED" && (
                  <span
                    title="클릭하여 반려 사유를 확인해주세요"
                    style={{ color: "#d32f2f", fontWeight: "bold", cursor: "pointer" }}
                    onClick={() =>
                      setSelectedRejectedId(
                        selectedRejectedId === qna.qnaId ? null : qna.qnaId
                      )
                    }
                  >
                    신청반려▼
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      {/* 반려 사유 출력 */}
      {selectedRejectedId && (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid #d32f2f",
            padding: "1rem",
            borderRadius: "6px",
            background: "#ffecec",
            color: "#d32f2f",
          }}
        >
          <strong>반려 사유 :</strong>{" "}
          {
            dummyData.find((qna) => qna.qnaId === selectedRejectedId)
              ?.rejectReason
          }
        </div>
      )}
      <div style={{marginTop: "10px", color:"red"}}>* 관리자가 승인하기 전까지 마일리지 신청을 취소하실 수 있습니다.</div>

      <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
    </Wrapper>
    </>
  );
};

export default MypageMile;