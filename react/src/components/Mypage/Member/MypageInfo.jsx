import { useNavigate } from "react-router-dom";
import { Title, InfoContainer, LeftDiv, Label, Input, BtnDiv, UpdateBtn, BackBtn } from "./Member.style";
import { useEffect, useState } from "react";
import axios from "axios";
import MypagePromise from "./MypagePromise";

const MypageInfo = () => {

  const navi = useNavigate();
  //const testToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4IiwidXNlckVtYWlsIjoia3lzbWFuMjU4MEBuYXZlci5jb20iLCJpYXQiOjE3NDU1NTc2OTgsImV4cCI6MTc0NTU1OTQ5OH0.Prgl_3jgJKMShNYrWqYjaT6_0gaaEqeUBCxi5IGSj5wLQBGYbBqw3i7ixivx5NHKAYl7N70RHs-CPJvB70FDIQ";
  const token = sessionStorage.getItem("accessToken");


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
          <BtnDiv>
            <UpdateBtn>내 정보 수정하기</UpdateBtn>
            <BackBtn onClick={() => navi(-1)}>뒤로가기</BackBtn>
          </BtnDiv>
        </LeftDiv>

        {/* 나의 다짐 */}
        <MypagePromise token={token} />

      </InfoContainer>
    </>
  );

};

export default MypageInfo;


