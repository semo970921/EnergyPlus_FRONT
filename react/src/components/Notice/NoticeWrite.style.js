import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const TitleInput = styled.input`
  font-size: 18px;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ContentTextarea = styled.textarea`
  min-height: 300px;
  font-size: 16px;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

export const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 10px 24px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  background-color: #85C662; /* 메인 컬러 */
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
