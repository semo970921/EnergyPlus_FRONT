import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1000px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const UtilBox = styled.div`
  display: flex;
  gap: 8px;
`;


export const SearchInput = styled.input`
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
`;


export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;


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


export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
`;


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
