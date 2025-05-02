import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 510px;
`;

export const ContentWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

export const TopSection = styled.div`
  align-self: flex-start;
  margin-bottom: 30px;
`;


export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Welcome = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Grade = styled.div`
  font-size: 18px;
  color: #666;
  margin-top: 3px;
`;

export const MenuGrid = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

export const MenuItem = styled.div`
  width: 150px;
  height: 140px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;

export const Label = styled.div`
  margin-top: 8px;
  font-size: 19px;
`;