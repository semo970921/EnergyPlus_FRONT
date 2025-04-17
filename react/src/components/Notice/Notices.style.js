// Notice.style.js
import styled from "styled-components";

export const Container = styled.div`
  padding: 30px 80px;
`;

export const TabMenu = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

export const Tab = styled.button`
  background-color: ${(props) => (props.active ? "#4CAF75" : "#ddd")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const NoticeBox = styled.div`
  border: 1px solid #4CAF75;
  border-radius: 8px;
  overflow: hidden;
`;

export const NoticeHeader = styled.div`
  background-color: #4CAF75;
  color: white;
  padding: 14px;
  font-weight: bold;
`;

export const NoticeList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NoticeItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 20px;
  border-top: 1px solid #eee;
  cursor: pointer;

  transition: background-color 0.2s;

  &:active {
    background-color: #f2f2f2;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 30px 0 20px;
`;

export const PageBtn = styled.button`
  background-color: #4CAF75;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 50%;
  cursor: pointer;
`;

export const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const SearchInput = styled.input`
  width: 250px;
  padding: 8px 12px;
`;

export const SearchButton = styled.button`
  background-color: #4CAF75;
  color: white;
  padding: 8px 20px;
  border: none;
  cursor: pointer;
`;