import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";
import Header from "./components/Common/Header/Header";
import Home from "./components/Common/Home/Home";
import MileageInfo from "./components/Mileage/MileageInfo/MileageInfo";
import MypageMain from "./components/Mypage/MypageMain";
import Notices from "./components/Notice/Notices";
import NoticeDetail from "./components/Notice/NoticeDetail";
import NoticeWrite from "./components/Notice/NoticeWrite";
import ChallengeList from "./components/Challenge/ChallengeList";
import MarketList from "./components/Market/MarketList";
import MileageForm from "./components/Mileage/MileageForm/MileageForm";
import MarketDetail from "./components/Market/MarketDetail";
import MarketForm from "./components/Market/MarketForm";
import MarketEdit from "./components/Market/MarketEdit";
import MypageInfo from "./components/Mypage/Member/MypageInfo";
import MypageQna from "./components/Mypage/Qna/MypageQna";
import MypageDelMember from "./components/Mypage/Member/MypageDelMember";
import MypageQnaForm from "./components/Mypage/Qna/MypageQnaForm";
import MypageQnaDetail from "./components/Mypage/Qna/MypageQnaDetail";
import ChallengeWrite from "./components/Challenge/ChallengeWrite";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {/* 각자 라우트 추가하기~~ */}
          <Route path="/" element={<Home />} />
          {/* 공지사항 */}
          <Route path="/notices" element={<Notices />} />
          <Route path="/notices/:noticeId" element={<NoticeDetail />} />
          <Route path="/noticewrite" element={<NoticeWrite />} />
          {/* 챌린지 */}
          <Route path="/challenges" element={<ChallengeList />} />
          <Route path="/challenges/write" element={<ChallengeWrite />} />
          {/* 분류해서 모아주세요 */}
          <Route path="/mileageinfo" element={<MileageInfo />} />
          {/* 마이페이지 */}
          <Route path="/mypage_main" element={<MypageMain />} />
          <Route path="/mypage_info" element={<MypageInfo />} />
          <Route path="/mypage_delMember" element={<MypageDelMember />} />
          <Route path="/mypage_qna" element={<MypageQna />} />
          <Route path="/mypage_qna_form" element={<MypageQnaForm />} />{" "}
          {/* 새글 작성 */}
          <Route path="/mypage_qna_form/:id" element={<MypageQnaForm />} />{" "}
          {/* 글 수정 */}
          <Route path="/mypage_qna/:id" element={<MypageQnaDetail />} />
          <Route path="/market_list" element={<MarketList />} />
          <Route path="/mileage-form" element={<MileageForm />} />
          <Route path="/markets/:marketNo" element={<MarketDetail />} />
          <Route path="/marketform" element={<MarketForm />} />
          <Route path="/markets/edit/:marketNo" element={<MarketEdit />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
