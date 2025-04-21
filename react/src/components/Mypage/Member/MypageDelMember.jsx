import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Label, Input,  UpdateBtn, BackBtn } from "./Member.style";

const MypageDelMember = () => {

  const navi = useNavigate();

  return(
    <>
      <Title>회원 탈퇴</Title>
      <InfoContainer>
        <LeftDiv>
          <Label>비밀번호 확인</Label>
          <Input />
          <BtnDiv>
            <UpdateBtn>탈퇴하기</UpdateBtn>
            <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
          </BtnDiv>
        </LeftDiv>
      </InfoContainer>
    </>
  );
};

export default MypageDelMember;



const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 30%;
  margin-bottom: 60px;
  text-align: start;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: calc(100vh - 590px);
  display: flex;
  justify-content: center;
  align-items: start;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 20px;
  align-items: start;
`;

// 버튼 묶음
export const BtnDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-left: 5px;
  margin-top: 30px;
`;