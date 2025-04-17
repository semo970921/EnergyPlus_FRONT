import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const mypage_info = () => {

  const navi = useNavigate();

  return(
    <>
      <InfoContainer>
        <LeftDiv>
          <Label>아이디</Label><br/>
          <Input disabled /><br/>

          <Label>비밀번호</Label><br/>
          <Input /><br/>

          <Label>이름</Label><br/>
          <Input /><br/>

          <Label>전화번호</Label><br/>
          <Input />
        </LeftDiv>

        <RightDiv>
          <Label>나의 다짐</Label>
          <RightInput cols={30} rows={5} maxLength={200}/>

          <BtnDiv>
            <UpdateBtn>수정하기</UpdateBtn>
            <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
          </BtnDiv>
        </RightDiv>
      </InfoContainer>
    </>
  );

};

export default mypage_info;

const InfoContainer = styled.div`
  width: 60%;
  max-width: 1000px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 40px;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;

// 좌측: 아이디 ~ 전화번호
const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 17px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #bbb;
  border-radius: 5px;
  font-size: 17px;
  padding: 0 10px;
`;

// 우측: 다짐 + 버튼
const RightDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

// 다짐
const RightInput = styled.textarea`
  width: 300px;
  height: 200px;
  font-size: 17px;
  padding: 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  margin-top: 20px;
`;

// 버튼 묶음
const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin: auto;
  margin-top: 20px;
`;

// 수정
const UpdateBtn = styled.button`
  width: 140px;
  height: 40px;
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
const BackBtn = styled.button`
  width: 140px;
  height: 40px;
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
