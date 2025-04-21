import { useNavigate } from "react-router-dom";
import { Title, InfoContainer, LeftDiv, Label, Input, 
          RightDiv, RightInput, BtnDiv, UpdateBtn, BackBtn } from "./Member.style";

const mypageInfo = () => {

  const navi = useNavigate();

  return(
    <>
      <Title>내 정보 수정</Title>
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

export default mypageInfo;


