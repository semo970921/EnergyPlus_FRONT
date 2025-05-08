import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoadingContainer = styled.div`
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

const LoginSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL 쿼리 파라미터에서 토큰 정보 추출
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const userEmail = params.get('userEmail');
    const userName = params.get('userName');
    const userRole = params.get('userRole');
    const isNewUser = params.get('isNewUser') === 'true';
    
    if (token) {
      // 세션 스토리지에 토큰 정보 저장!!
      sessionStorage.setItem('accessToken', token);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('userEmail', userEmail);
      sessionStorage.setItem('userName', userName);
      sessionStorage.setItem('userRole', userRole);
      
      // 로그인 상태 변경 이벤트
      window.dispatchEvent(new Event('loginStateChanged'));
      
      if (isNewUser) {
        alert(`${userName}님 환영합니다! 회원가입이 완료되었습니다.`);
      } else {
        alert(`${userName}님 환영합니다!`);
      }
      
      // 홈 화면으로!!
      setTimeout(() => {
        if (userRole === 'ROLE_ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }, 1000);
    } else {
      // 토큰 정보가 없는 경우 -> 로그인 페이지로 이동
      alert('로그인 정보를 받아오지 못했습니다. 다시 시도해주세요.');
      navigate('/login');
    }
  }, [location, navigate]);

  return (
    <LoadingContainer>
      <LoadingText>로그인 처리 중입니다.</LoadingText>
      <LoadingSpinner />
    </LoadingContainer>
  );
};

export default LoginSuccess;