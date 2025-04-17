import { FaUserEdit, FaUserTimes, FaClipboard, FaCoins, FaQuestionCircle } from "react-icons/fa";
import { Container, ContentWrapper, TopSection, Profile, Greeting, Welcome, Grade, 
          MenuGrid, MenuItem, Label } from "./Mypage.style";
import { useNavigate } from "react-router-dom";

const Mypage_main = () => {

  const navi = useNavigate();

  // 나중에 axios로 로그인 회원 아이디, 등급 불러와서 관련 로직 추가해야함.

  /*
    메인 페이지: mypage_main
    내 정보 수정: mypage_info
    회원 탈퇴: mypage_deleteMember
    내 게시글: mypage_board
    내 마일리지 현황: mypage_mile
    내 마일리지 신청 현황: mypage_mileStatus
    QnA: mypage_Qna
  */

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
            <MenuItem onClick={() => navi("/mypage_info")}>
              <FaUserEdit size={60} />
              <Label>내 정보 수정</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_deleteMember")}>
              <FaUserTimes size={60} />
              <Label>회원 탈퇴</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_board")}>
              <FaClipboard size={60} />
              <Label>나의 게시글</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_mile")}>
              <FaCoins size={60} />
              <Label>마일리지 현황</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_Qna")}>
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