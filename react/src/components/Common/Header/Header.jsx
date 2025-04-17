import styled from "styled-components";
import LogoImg from "../../../assets/img/Logo.png";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <>
      <div className="header">
        <a href="/" className="logo">
          <img src={LogoImg} alt="에너지 생활+ 로고" />
        </a>
        <div className="slogan-wrap">
          <span>탄소 중립 실천 다짐을 작성해주세여.</span>
        </div>
        <ul className="header-link">
          <li className="link-item">로그인</li>
          <li className="link-item">회원가입</li>
          <li className="link-item">마이페이지</li>
        </ul>
      </div>
      <Nav />
    </>
  );
};

export default Header;
