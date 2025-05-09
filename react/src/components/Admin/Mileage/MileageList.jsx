import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  HeaderRow,
  Title,
  StyledTable,
  Pagination,
  PageBtn,
} from "../../TableStyle/Table.style";

const MileageList = () => {
  const [mileages, setMileages] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetchList(pageNo);
  }, [pageNo]);

  const fetchList = async () => {
    try {
      const res = await axios.get(
        `http://localhost/admin/mileages?page=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMileages(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("챌린지 목록 불러오기 실패", err);
    }
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>마일리지 인증 신청 목록</Title>
      </HeaderRow>

      <StyledTable>
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성시간</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {mileages.map((m) => (
            <tr
              key={m.mileageSeq}
              onClick={() => navigate(`/admin/mileage/${m.mileageSeq}`)}
            >
              <td>{m.mileageSeq}</td>
              <td>{m.mileageCategory}</td>
              <td>{m.userName}</td>
              <td>{m.createDate}</td>
              <td>{m.mileageStatus === "N" ? "확인중" : "답변완료"}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <Pagination>
        <PageBtn onClick={() => setPageNo((prev) => Math.max(prev - 1, 0))}>
          &lt;&lt;
        </PageBtn>
        {[0, 1, 2, 3, 4].map((n) => (
          <PageBtn
            key={n}
            onClick={() => setPageNo(n)}
            style={{ fontWeight: pageNo === n ? "bold" : "normal" }}
          >
            {n + 1}
          </PageBtn>
        ))}
        <PageBtn onClick={() => setPageNo((prev) => prev + 1)}>
          &gt;&gt;
        </PageBtn>
      </Pagination>
    </Wrapper>
  );
};

export default MileageList;
