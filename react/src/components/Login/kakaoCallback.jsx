import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { processKakaoLogin } from "../../services/authService";
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
  const location = useLocation();
  const [error, setError] = useState("");


  useEffect(() => {
    const handleKakaoCallback = async () => {
      const code = new URLSearchParams(location.search).get("code");
      
      if (!code) {
        setError("인증 코드를 찾을 수 없습니다.");
        return;
      }
  
      try {
        // 기존 세션 스토리지 초기화
        sessionStorage.clear();
        
        // 백엔드에 인증 코드 전송
        const data = await processKakaoLogin(code);
        
        // 토큰 저장
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem("refreshToken", data.refreshToken);
        
        // 사용자 정보 저장
        sessionStorage.setItem("userEmail", data.userEmail);
        sessionStorage.setItem("userName", data.userName);
        sessionStorage.setItem("userRole", data.userRole);
        
        // 로그인 상태 변경 이벤트 발생
        window.dispatchEvent(new Event("loginStateChanged"));
        
        // 신규 사용자인 경우
        if (data.isNewUser) {
          alert(data.userName + "님 환영합니다! 회원가입이 완료되었습니다.");
        } else {
          alert(data.userName + "님 환영합니다!");
        }
        
        if (data.userRole === "ROLE_ADMIN") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/"; 
        }
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        setError(error.response?.data?.error || "카카오 로그인 처리 중 오류가 발생했습니다.");
      }
    };
    
    handleKakaoCallback();
  }, [location]);
    

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