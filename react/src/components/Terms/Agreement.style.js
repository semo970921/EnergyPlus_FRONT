import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
`;

export const Section = styled.div`
  margin-bottom: 30px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
`;

export const SectionTitle = styled.div`
  padding: 15px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 500;
`;


export const ContentText = styled.div`
  margin-bottom: 15px;
  line-height: 1.6;
  font-size: 14px;
  color: #444;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
  font-size: 14px;
`;

export const TableHeader = styled.th`
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  text-align: center;
  font-weight: 600;
  color: #333;
  font-size: 13px;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  line-height: 1.5;
  vertical-align: top;
  font-size: 13px;
`;

export const AgreementContainer = styled.div`
  padding: 15px;
  border-top: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  user-select: none;
`;

export const Checkbox = styled.input`
  margin-right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: #4CAF50;
`;

export const SubmitButton = styled.button`
  display: block;
  width: 150px;
  margin: 30px auto 0;
  padding: 12px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #0b7dda;
  }
`;

export const ScrollContainer = styled.div`
  max-height: 200px;
  overflow-y: auto;
  padding: 15px;
  background-color: white;
  
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 8px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
