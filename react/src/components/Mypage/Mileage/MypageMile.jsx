import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Wrapper, HeaderRow, PageBtn, Pagination, SearchBox, SearchButton,
  StyledTable, Title, BackBtn
} from "../../TableStyle/Table.style";
import { useEffect, useState } from "react";
import axios from "axios";

const MypageMile = () => {
  const navi = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 0;
  const keywordParam = searchParams.get("keyword") || "";

  const [selectedCategory, setSelectedCategory] = useState(keywordParam);
  const [searchCategory, setSearchCategory] = useState(keywordParam); // 검색 확정값

  const [mileData, setMileData] = useState([]);
  const [page, setPage] = useState(pageParam);
  const [totalCount, setTotalCount] = useState(0);
  const size = 5;
  const totalPages = Math.ceil(totalCount / size);

  const pageBlockSize = 5;
  const currentBlock = Math.floor(page / pageBlockSize);
  const startPage = currentBlock * pageBlockSize;
  const endPage = Math.min(startPage + pageBlockSize, totalPages);

  const token = sessionStorage.getItem("accessToken");
  const [selectedRejectedId, setSelectedRejectedId] = useState(null);

  useEffect(() => {
    const params = { page: page };
    if (searchCategory) params.keyword = searchCategory;
  
    axios.get("http://localhost/mymile", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMileData(res.data.list ?? []);
        setTotalCount(res.data.totalCount ?? 0);
      })
      .catch((err) => {
        console.error("마일리지 조회 실패", err);
      });
  }, [page, searchCategory]);

  const handleCancel = async (id) => {
    if(!window.confirm(`${id}번 신청을 취소하시겠습니까?`)) return;

    try {
      await axios.delete(`http://localhost/mymile/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("신청이 취소되었습니다.");

      // UI 갱신
      setSearchCategory((prev) => prev); // 강제로 useEffect 재실행

    } catch (err) {
      console.error("취소 실패", err);
      alert("취소 요청 중 문제가 발생했습니다.");
    }
  };

  const goToPage = (p) => {
    setPage(p);
    setSearchParams({ page: p, keyword: searchCategory });
  };

  return (
    <>
    <Wrapper>
      <HeaderRow>
        <Title>마일리지 신청 현황</Title>

        <SearchBox>
          <select
            value={selectedCategory}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCategory(value);
              setSearchCategory(value);
              setPage(0);

              if (value) {
                setSearchParams({ page: 0, keyword: value });
              } else {
                setSearchParams({ page: 0 }); // keyword 제거
              }
            }}
            style={{ padding: "0.5rem", borderRadius: "4px" }}
          >
            <option value="">카테고리 선택</option>
            <option value="자전거">자전거</option>
            <option value="다회용기">다회용기</option>
            <option value="기타">기타</option>
          </select>

          {/* 초기화 버튼*/}
          {selectedCategory && (
            <SearchButton
              onClick={() => {
                setSelectedCategory("");
                setSearchCategory("");
                setPage(0);
                setSearchParams({ page: 0 });
              }}
            >
              초기화
            </SearchButton>
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
            <th>승인 시간</th>
            <th>신청 현황</th>
          </tr>
        </thead>
        <tbody>
          {mileData.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "1rem" }}>
                검색 결과가 없습니다.
              </td>
            </tr>
          ) : (
            mileData.map((item, idx) => (
              <tr key={item.mileageSeq}>
                <td>{item.mileageSeq}</td>
                <td>{item.mileageCategory}</td>
                <td>{item.mileageScore}</td>
                <td>{item.createDate}</td>
                <td>{item.approveDate}</td>
                <td>
                  {item.mileageStatus === "Y" && <span style={{ color: "gray" }}>지급완료</span>}
                  {item.mileageStatus === "N" && (
                    <SearchButton onClick={() => handleCancel(item.mileageSeq)}>취소하기</SearchButton>
                  )}
                  {item.mileageStatus === "REJECTED" && (
                    <span
                      title="클릭하여 반려 사유를 확인해주세요"
                      style={{ color: "#d32f2f", fontWeight: "bold", cursor: "pointer" }}
                      onClick={() =>
                        setSelectedRejectedId(
                          selectedRejectedId === item.mileageSeq ? null : item.mileageSeq
                        )
                      }
                    >
                      신청반려▼
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </StyledTable>

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
            mileData.find((item) => item.mileageSeq === selectedRejectedId)
              ?.mileageReject
          }
        </div>
      )}

      <div style={{ marginTop: "10px", color: "red" }}>
        * 관리자가 승인하기 전까지 마일리지 신청을 취소하실 수 있습니다.
      </div>

      {/* 페이징 */}
      <Pagination>
        <PageBtn onClick={() => setPage(0)} disabled={page === 0}>≪</PageBtn>
        <PageBtn onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>{"<"}</PageBtn>

        {Array.from({ length: endPage - startPage }, (_, i) => (
          <PageBtn
            key={startPage + i}
            onClick={() => goToPage(startPage + i)}
            active={page === startPage + i}
          >
            {startPage + i + 1}
          </PageBtn>
        ))}

        <PageBtn onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>{">"}</PageBtn>
        <PageBtn onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>≫</PageBtn>
      </Pagination>

      <BackBtn onClick={() => navi("/mypage_mile_visual")}>뒤로가기</BackBtn>
    </Wrapper>
  </>
  );
};

export default MypageMile;
