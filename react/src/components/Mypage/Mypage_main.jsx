import styled from "styled-components";
import { FaUserEdit, FaUserTimes, FaClipboard, FaCoins, FaQuestionCircle } from "react-icons/fa";

const Mypage_main = () => {
  return(
    <>
      <Container>
        <ContentWrapper>
          <TopSection>
            <Profile>
              <Greeting>
                <Welcome><strong>○○○</strong>님 환영합니다.</Welcome>
                <Grade>현재 내 등급 : <strong>새싹</strong></Grade>
              </Greeting>
            </Profile>
          </TopSection>

          <MenuGrid>
            <MenuItem>
              <FaUserEdit size={60} />
              <Label>내 정보 수정</Label>
            </MenuItem>
            <MenuItem>
              <FaUserTimes size={60} />
              <Label>회원 탈퇴</Label>
            </MenuItem>
            <MenuItem>
              <FaClipboard size={60} />
              <Label>나의 게시글</Label>
            </MenuItem>
            <MenuItem>
              <FaCoins size={60} />
              <Label>마일리지 현황</Label>
            </MenuItem>
            <MenuItem>
              <FaQuestionCircle size={60} />
              <Label>QnA</Label>
            </MenuItem>
          </MenuGrid>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default Mypage_main;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const ContentWrapper = styled.div`
  width: 1000px;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  align-self: flex-start;
  margin-bottom: 30px;
`;


const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Welcome = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Grade = styled.div`
  font-size: 16px;
  color: #666;
  margin-top: 3px;
`;

const MenuGrid = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const MenuItem = styled.div`
  width: 180px;
  height: 150px;
  border: 1px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const Label = styled.div`
  margin-top: 8px;
  font-size: 19px;
`;