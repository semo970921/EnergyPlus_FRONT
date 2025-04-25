import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LoginContainer,
  LoginBox,
  LoginTitle,
  Form,
  InputField,
  LoginButton,
  LinkContainer,
  LinkItem,
  Separator,
  ErrorMessage
} from "./LoginForm.styles";

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    //폼 유효성 검사
    if (!userEmail.trim() || !userPassword.trim()) {
      setErrorMsg("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }
    
    setIsLoading(true);
    setErrorMsg("");
    
    try {
        console.log("로그인 시도:", { userEmail, userPassword });
        
        // 백엔드 API 호출
        const response =  await axios.post("http://localhost:80/auth/login", {
          userEmail: userEmail,
          userPassword: userPassword
        });
        
        console.log("로그인 응답:", response.data);
        
        // 로그인 성공 처리
        if (response.data) {
          // 토큰 저장
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          
          // 사용자 정보 저장
          localStorage.setItem("userEmail", response.data.userEmail);
          localStorage.setItem("userName", response.data.userName);
          
          alert(response.data.userName + "님 환영합니다!");
          
          // 홈 페이지로 리다이렉션
          navigate("/");
        }
      } catch (error) {
        console.error("로그인 오류:", error);

      } finally {
        setIsLoading(false);
      }
  };

  return (
    <LoginContainer>
      <LoginBox>
        <LoginTitle>로그인</LoginTitle>
        <Form onSubmit={handleLogin}>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
          
          <InputField
            type="email"
            placeholder="이메일"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            disabled={isLoading}
          />
          
          <InputField
            type="password"
            placeholder="비밀번호"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            disabled={isLoading}
          />
          
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </LoginButton>
        </Form>
        
        <LinkContainer>
          <LinkItem onClick={() => navigate("/find-password")}>비밀번호 찾기</LinkItem>
          <Separator>|</Separator>
          <LinkItem onClick={() => navigate("/find-id")}>아이디 찾기</LinkItem>
          <Separator>|</Separator>
          <LinkItem onClick={() => navigate("/signup")}>회원가입</LinkItem>
        </LinkContainer>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginForm;