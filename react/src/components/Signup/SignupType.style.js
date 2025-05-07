import styled from "styled-components";

export const SignupTypeContainer = styled.div`
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  padding: 20px;
`;

export const SignupTypeTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 30px;
  font-family: Pretendard, sans-serif;
`;

export const SignupTypeContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const KakaoSignupButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 12px 0;
  background-color: #FEE500;
  color: #000000;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  img {
    width: 20px;
    height: 20px;
  }
  
  &:hover {
    background-color: #F2D900;
  }
`;

export const EmailSignupButton = styled.button`
  width: 100%;
  padding: 12px 0;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #3e8e41;
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #888;
  font-size: 14px;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #e0e0e0;
  }
  
  span {
    padding: 0 10px;
  }
`;