import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Wrapper,
  HeaderRow,
  Title,
  SearchBox,
  SearchInput,
  SearchButton,
  StyledTable,
  WriteButton,
  Pagination,
  PageBtn,
  BackBtn,
} from "../../TableStyle/Table.style";

const MileageList = () => {
  const [mileages, setMileages] = useState([]);
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await axios.get("http://localhost/admin/mileages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
              key={m.challengeSeq}
              onClick={() => navigate(`/challenges/${c.challengeSeq}`)}
            >
              <td>{m.mileageSeq}</td>
              <td>{m.mileageCategory}</td>
              <td>{m.userName}</td>
              <td>{m.createDate}</td>
              <td>{m.challengeStatus === "Y" ? "답변완료" : "확인중"}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>

      <Pagination>
        <PageBtn
          onClick={() => {
            /* 이전 페이지 로직 */
          }}
        >
          &lt;&lt;
        </PageBtn>
        {[1, 2, 3, 4, 5].map((n) => (
          <PageBtn
            key={n}
            onClick={() => {
              /* 페이지 이동 로직 */
            }}
          >
            {n}
          </PageBtn>
        ))}
        <PageBtn
          onClick={() => {
            /* 다음 페이지 로직 */
          }}
        >
          &gt;&gt;
        </PageBtn>
      </Pagination>
    </Wrapper>
  );
};

export default MileageList;
