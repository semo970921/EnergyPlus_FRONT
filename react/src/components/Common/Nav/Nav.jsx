import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navi = useNavigate();

  return (
    <NavLayout>
      <NavLinks>
        <NavItem>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>HOME</a>
        </NavItem>

        <NavItem>
          소개
          <DropdownMenu>
            <DropdownItem>소개 1</DropdownItem>
            <DropdownItem>소개 2</DropdownItem>
          </DropdownMenu>
        </NavItem>

        <NavItem>
          마일리지
          <DropdownMenu>
            <DropdownItem onClick={() => navi("/mileageInfo")}>
              마일리지 안내
            </DropdownItem>
            <DropdownItem>마일리지 신청</DropdownItem>
          </DropdownMenu>
        </NavItem>

        <NavItem>
          챌린지
          <DropdownMenu>
            <DropdownItem>챌린지 1</DropdownItem>
            <DropdownItem>챌린지 2</DropdownItem>
          </DropdownMenu>
        </NavItem>

        <NavItem>
          커뮤니티
          <DropdownMenu>
            <DropdownItem href="/notices">공지사항</DropdownItem>
            <DropdownItem>FAQ</DropdownItem>
            <DropdownItem>중고거래</DropdownItem>
          </DropdownMenu>
        </NavItem>
      </NavLinks>
    </NavLayout>
  );
};

export default Nav;

const NavLayout = styled.nav`
  height: 66px;
  background: linear-gradient(90deg, #85c662 0%, #57b1ff 100%);
`;

const NavLinks = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  position: relative;
  color: white;
  font-family: Pretendard;
  font-size: 26px;
  cursor: pointer;

  &:hover > div {
    display: block;
  }
`;

const DropdownMenu = styled.div`
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  min-width: 140px;
  border: 1px solid lightgray;
  z-index: 10;
  border-radius: 6px;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  white-space: nowrap;
  font-size: 20px;

  &:hover {
    background-color: #f0f0f0;
  }
`;
