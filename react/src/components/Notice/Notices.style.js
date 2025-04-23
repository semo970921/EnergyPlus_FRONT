import styled from "styled-components";

// 전체 래퍼
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

// 헤더(제목 + 버튼 등)
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

// 페이지/섹션 제목
export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

// 탭 메뉴
export const TabMenu = styled.div`
  display: flex;
  gap: 16px;
`;

export const Tab = styled.button`
  background: none;
  border: none;
  padding: 8px 12px;
  font-size: 1rem;
  cursor: pointer;
  color: ${({ active }) => (active ? "#333" : "#777")};
  border-bottom: ${({ active }) => (active ? "2px solid #85C662" : "2px solid transparent")};
`;

// 글쓰기 버튼
export const WriteButton = styled.button`
  padding: 8px 16px;
  background-color: #85C662;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// 리스트 박스
export const NoticeBox = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  overflow: hidden;
`;

// 리스트 헤더
export const NoticeHeader = styled.div`
  background-color: #f5f5f5;
  padding: 12px 16px;
  font-weight: 500;
  cursor: pointer;
`;

// 리스트 항목 컨테이너
export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
`;

// 리스트 아이템
export const NoticeItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }

  span {
    &:first-child {
      flex: 1;
      font-size: 1rem;
      color: #333;
    }
    &:last-child {
      font-size: 0.875rem;
      color: #999;
    }
  }
`;

// 페이지네이션
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
  gap: 8px;
`;

export const PageBtn = styled.button`
  padding: 6px 12px;
  border: 1px solid #ddd;
  background-color: ${({ disabled, $active }) =>
    disabled ? "#f0f0f0" : $active ? "#85C662" : "#fff"};
  color: ${({ disabled, $active }) =>
    disabled ? "#bbb" : $active ? "#fff" : "#333"};
  border-radius: 4px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;

// 검색박스 (input + 버튼)
export const SearchBox = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SearchButton = styled.button`
  padding: 8px 16px;
  background-color: #85C662;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
