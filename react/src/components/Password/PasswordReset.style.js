import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
`;

export const ResetForm = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 24px;
  font-weight: bold;
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.div`
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 16px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  height: 40px;
`;

export const ResetButton = styled.button`
  width: 150px;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin: 1rem auto;
  display: block;
  
  &:hover {
    background-color: #45a049;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  margin-bottom: 1rem;
  text-align: center;
`;

export const SuccessMessage = styled.div`
  color: #28a745;
  margin-bottom: 1rem;
  text-align: center;
`;