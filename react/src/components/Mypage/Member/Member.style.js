import styled from "styled-components";

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-top: 60px;
  margin-left: 20%;
`;

export const InfoContainer = styled.div`
  width: 60%;
  max-width: 1000px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  margin: auto;
  gap: 50px;
  height: 450px;
`;

// 좌측: 아이디 ~ 전화번호
export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 17px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 17px;
  padding: 0 10px;
  margin-top: -15px;
`;

// 우측: 다짐 + 버튼
export const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

// 다짐
export const RightInput = styled.textarea`
  width: 300px;
  height: 200px;
  font-size: 17px;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  margin-top: 10px;
`;

// 버튼 묶음
export const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin: auto;
  margin-top: 30px;
`;

// 수정
export const UpdateBtn = styled.button`
  width: 150px;
  height: 50px;
  background-color: #408C70;
  border: 1px solid #408C70;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color:rgb(103, 178, 150);
    border: 1px solid #408C70;
    color: white;
  }
`;

// 뒤로가기
export const BackBtn = styled.button`
  width: 150px;
  height: 50px;
  background-color: white;
  color: #408C70;
  font-weight: bold;
  border: 1px solid #408C70;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: #408C70;
    color: white;
  }
`;