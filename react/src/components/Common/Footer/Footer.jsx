import styled from "styled-components";

const Footer = () => {
  return (
    <>
      <FooterLayout>
        <FooterTop>
          개인정보 처리 방침 | 이메일 무단수집 거부 | 이용약관
        </FooterTop>
        <FooterP>
          KH정보교육원 종로지원 | 에코로그 팀 <br />
          남대문로 120 대일빌딩 2층, 3층
        </FooterP>
      </FooterLayout>
    </>
  );
};

export default Footer;

const FooterLayout = styled.footer`
  height: 145px;
  background: #5d6359;
  padding: 30px 56px;
`;

const FooterTop = styled.div`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
`;

const FooterP = styled.p`
  color: #fff;
  font-size: 20px;
`;
