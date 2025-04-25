import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const LoginBox = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #4b8a3a;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`;

export const InputField = styled.input`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  &:focus {
    border-color: #4b8a3a;
  }
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const LoginButton = styled.button`
  padding: 15px;
  background-color: #4b8a3a;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.disabled ? '#4b8a3a' : '#3a7029'};
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  font-size: 14px;
`;

export const LinkItem = styled.span`
  color: #666;
  cursor: pointer;
  &:hover {
    color: #4b8a3a;
    text-decoration: underline;
  }
`;

export const Separator = styled.span`
  margin: 0 10px;
  color: #ddd;
`;

export const ErrorMessage = styled.div`
  color: #e74c3c;
  background-color: #fadbd8;
  padding: 12px;
  border-radius: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  text-align: center;
`;