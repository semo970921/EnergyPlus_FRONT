import axios from 'axios';

const API_URL = 'http://localhost:80/auth';

// 로그인 상태 확인
export const checkAuthStatus = () => {
  const token = sessionStorage.getItem('accessToken');
  return !!token;
};

// 일반 로그인
export const login = async (userEmail, userPassword) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      userEmail,
      userPassword
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 카카오 로그인 URL 
export const getKakaoLoginURL = async () => {
  try {
    // 백엔드에서 카카오 로그인 URL 가져오기
    const response = await axios.get(`${API_URL}/kakao/login-url`);
    console.log("카카오 로그인 URL 조회 결과:", response.data);  // 디버깅용
    return response.data.url;
  } catch (error) {
    console.error("카카오 로그인 URL 조회 실패:", error);
    throw error;
  }
};

// 로그아웃
export const logout = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('userEmail');
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('userRole');
  
  // 로그인 상태변경 이벤트 발생
  window.dispatchEvent(new Event('loginStateChanged'));
};

// 사용자 정보 가져오기
export const getCurrentUser = () => {
  return {
    email: sessionStorage.getItem('userEmail'),
    name: sessionStorage.getItem('userName'),
    role: sessionStorage.getItem('userRole')
  };
};