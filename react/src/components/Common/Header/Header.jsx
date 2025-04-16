import styled from "styled-components";
import LogoImg from "../../../assets/img/Logo.png";
import Nav from "../Nav/Nav";

const Header = () => {
  return (
    <>
      <HeaderLayout>
        <a href="/">
        <Logo src={LogoImg} alt="에너지 생활+ 로고" />
        </a>
        <Slogan>탄소 중립 실천 다짐을 작성해주세여.</Slogan>
        <HeaderLinks>
          <HeaderLink>로그인</HeaderLink>
          <HeaderLink>회원가입</HeaderLink>
        </HeaderLinks>
      </HeaderLayout>
      <Nav />
    </>
  );
};

export default Header;

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 126px;
`;

const Logo = styled.img`
  margin-left: 50px;
`;

const Slogan = styled.span`
  font-size: 20px;
  color: #444;
`;

const HeaderLinks = styled.div`
  display: flex;
  gap: 50px;
  margin-right: 80px;
`;

const HeaderLink = styled.a`
  font-size: 26px;
  color: #000;
  text-decoration: none;
  n &:hover {
    cursor: pointer;
  }
`;
