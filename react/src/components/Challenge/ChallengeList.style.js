// src/components/Challenge/ChallengeList.style.js
import styled from 'styled-components';

// 컨테이너 전체 래퍼
export const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
`;

// 헤더(타이틀 + 유틸 버튼 그룹)
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

// 검색·등록 버튼 박스
export const UtilBox = styled.div`
  display: flex;
  gap: 8px;
`;

// 검색 입력창
export const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
`;

// 테이블 형식 리스트
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

// 리스트 아이템
export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  &:hover {
    background-color: #fafafa;
  }
`;

// 공통 버튼 스타일 (검색, 글작성 등)
export const Button = styled.button`
  padding: 6px 16px;
  background-color: #85C662;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;

// 페이지네이션 컨테이너
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;

// 페이지 버튼
export const PageBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #85C662;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`;
