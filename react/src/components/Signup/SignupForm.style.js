import styled from "styled-components";

// 회원가입 폼 스타일
export const FormContainer = styled.div`
  background-color: #e0e0e0;
  padding: 30px;
  max-width: 900px;
  margin: 120px 20px 30px 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-family: Pretendard, sans-serif;
  font-weight: 600;
  color: #333;
  padding: 10px 0;
`;

export const FormContent = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  grid-column: ${props => props.fullWidth ? "span 2" : "auto"};
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-family: Pretendard, sans-serif;
  color: #333;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-family: Pretendard, sans-serif;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #57b1ff;
    box-shadow: 0 0 3px rgba(87, 177, 255, 0.3);
  }
  
  &:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const CheckButton = styled.button`
  padding: 0 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  white-space: nowrap;
  font-family: Pretendard, sans-serif;
  height: 40px;
  
  &:hover {
    background-color: #e0e0e0;
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666;
    cursor: not-allowed;
    
    &:hover {
      background-color: #cccccc;
    }
  }
`;

export const FormFooter = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 30px;
  grid-column: span 2;
  
  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  font-weight: 500;
  width: 120px;
  height: 45px;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: Pretendard, sans-serif;
  width: 120px;
  height: 45px;
  
  &:hover {
    opacity: 0.9;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export const HelpButtonWrapper = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
`;

export const HelpButton = styled.button`
  width: 40px;
  height: 40px;
  background-color:rgb(68, 66, 65);
  color: white;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background-color: #E64A19;
  }
`;

export const ErrorMessage = styled.span`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
  font-family: Pretendard, sans-serif;
`;

export const SuccessMessage = styled.span`
  color: #2e7d32;
  font-size: 12px;
  margin-top: 4px;
  font-family: Pretendard, sans-serif;
`;