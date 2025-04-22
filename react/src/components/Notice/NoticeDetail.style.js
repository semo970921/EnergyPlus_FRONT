import styled from "styled-components";

export const Container = styled.div`
  padding: 30px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h2`
  margin-bottom: 8px;
`;

export const DateText = styled.p`
  color: #888;
  font-size: 14px;
  margin-bottom: 20px;
`;

export const Content = styled.p`
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #85C662;
  color: #fff;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.9;
  }
`;
