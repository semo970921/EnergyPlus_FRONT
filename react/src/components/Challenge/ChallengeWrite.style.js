import styled from 'styled-components';

export const Wrapper = styled.form`
  max-width: 800px;
  margin: 40px auto;
  padding: 32px;
  background-color: #E2F6C7;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

export const TitleInput = styled.input`
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
`;

export const ContentTextarea = styled.textarea`
  height: 100px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #fff;
  font-size: 16px;
  resize: none;
`;

export const DescriptionTextarea = styled(ContentTextarea)`
  height: 120px;
`;

export const FileInputWrapper = styled.div`
  height: 50px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 12px;
`;

export const FileInput = styled.input`
  width: 100%;
  border: none;
  background: transparent;
`;

export const SubmitButton = styled.button`
  align-self: center;
  width: 160px;
  height: 48px;
  border: none;
  border-radius: 8px;
  background-color: #2F7A5E;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
`;
