import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CallbackContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

const LoadingText = styled.h2`
  color: #4b8a3a;
  margin-bottom: 20px;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #4b8a3a;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const KakaoCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");

  useEffect(() => {
    const processKakaoLogin = async () => {
      try {
        const code = new URLSearchParams(location.search).get("code");
        
        if (!code) {
          setError("인증 코드를 찾을 수 없습니다.");
          return;
        }

        console.log("카카오 인증 코드:", code);
        
        // 백엔드에 인증 코드 전송
        const response = await axios.get(`http://localhost/auth/kakao/callback?code=${code}`);
        
        console.log("카카오 로그인 응답:", response.data);
        
        if (response.data) {
          // 토큰 저장
          sessionStorage.setItem("accessToken", response.data.accessToken);
          sessionStorage.setItem("refreshToken", response.data.refreshToken);
          
          // 사용자 정보 저장
          sessionStorage.setItem("userEmail", response.data.userEmail);
          sessionStorage.setItem("userName", response.data.userName);
          sessionStorage.setItem("userRole", response.data.role);
          
          // 로그인 상태 변경 이벤트 발생
          window.dispatchEvent(new Event("loginStateChanged"));
          
          alert(response.data.userName + "님 환영합니다!");
          
          console.log("로그인 성공, 홈으로 이동합니다.");
          
          // 역할에 따라 리다이렉트 (하나의 메서드만 사용)
          if (response.data.role === "ROLE_ADMIN") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        }
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        console.error("오류 응답:", error.response?.data);
        setError("카카오 로그인 처리 중 오류가 발생했습니다.");
      }
    };
    
    processKakaoLogin();
  }, [location]);  // navigate 의존성 제거

  return (
    <CallbackContainer>
      {error ? (
        <LoadingText>{error}</LoadingText>
      ) : (
        <>
          <LoadingText>카카오 로그인 처리 중</LoadingText>
          <LoadingSpinner />
        </>
      )}
    </CallbackContainer>
  );
};

export default KakaoCallback;