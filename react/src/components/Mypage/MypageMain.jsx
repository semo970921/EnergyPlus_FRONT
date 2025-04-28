import { FaUserEdit, FaUserTimes, FaClipboard, FaCoins, FaQuestionCircle } from "react-icons/fa";
import { Container, ContentWrapper, TopSection, Profile, Greeting, Welcome, Grade, 
          MenuGrid, MenuItem, Label } from "./Mypage.style";
import { useNavigate } from "react-router-dom";

const MypageMain = () => {

  const navi = useNavigate();

  // 나중에 axios로 로그인 회원 아이디, 등급 불러와서 관련 로직 추가해야함.

  /*
    메인 페이지: mypage_main

    내 정보 수정: mypage_info
    > 나의 다짐 기능까지 완료

    회원 탈퇴: mypage_deleteMember
    > 화면만

    내 게시글: mypage_market

    내 마일리지 현황: mypage_mile

    내 마일리지 신청 현황: mypage_mileStatus

    QnA: mypage_Qna
    > 댓글까지 모두 완료
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
            <MenuItem onClick={() => navi("/mypage_delMember")}>
              <FaUserTimes size={60} />
              <Label>회원 탈퇴</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_market")}>
              <FaClipboard size={60} />
              <Label>나의 게시글</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_mile")}>
              <FaCoins size={60} />
              <Label>마일리지 현황</Label>
            </MenuItem>
            <MenuItem onClick={() => navi("/mypage_qna")}>
              <FaQuestionCircle size={60} />
              <Label>QnA</Label>
            </MenuItem>
          </MenuGrid>
        </ContentWrapper>
      </Container>
    </>
  );
};

export default MypageMain;