import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LogoImg from "../../../assets/img/Logo.png";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navi = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    checkLoginStatus();
  }, []);

  // 로그인 상태 확인 함수
  const checkLoginStatus = () => {
    const token = localStorage.getItem("accessToken");
    const storedUserName = localStorage.getItem("userName");
    
    if (token && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }
  };


  // 로그아웃 처리 함수
  const handleLogout = () => {
    // 로컬 스토리지에서 토큰 및 사용자 정보 제거
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    
    // 로그인 상태 업데이트
    setIsLoggedIn(false);
    setUserName("");
    
    alert("로그아웃 되었습니다.");
    
    // 홈 페이지로 이동
    navi("/");
  };

  return (
    <>
      <div className="header">
        <a href="/" className="logo">
          <img src={LogoImg} alt="에너지 생활+ 로고" />
        </a>
        <div className="slogan-wrap">
          <span>탄소 중립 실천 다짐을 작성해주세요</span>
        </div>
        <ul className="header-link">
          {isLoggedIn ? (
            // 로그인 상태일 때
            <>
              <li className="link-item welcome-text">{userName}님</li>
              <li className="link-item" onClick={handleLogout}>로그아웃</li>
              <li className="link-item" onClick={() => navi("/mypage_main")}>마이페이지</li>
            </>
          ) : (
            // 로그아웃 상태일 때
            <>
              <li className="link-item" onClick={() => navi("/login")}>로그인</li>
              <li className="link-item" onClick={() => navi("/signup")}>회원가입</li>
              <li className="link-item" onClick={() => navi("/mypage_main")}>마이페이지</li>
            </>
          )}
        </ul>
      </div>
      <Nav />
    </>
  );
};

export default Header;