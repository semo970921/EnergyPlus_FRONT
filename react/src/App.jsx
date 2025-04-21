import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";
import Header from "./components/Common/Header/Header";
import Home from "./components/Common/Home/Home";
import MileageInfo from "./components/Mileage/MileageInfo/MileageInfo";
import MypageMain from "./components/Mypage/MypageMain";
import Notices from "./components/Notice/Notices";
import MarketList from "./components/Market/MarketList/MarketList";
import MypageInfo from "./components/Mypage/Member/MypageInfo";
import MypageQna from "./components/Mypage/Qna/MypageQna";
import MypageDelMember from "./components/Mypage/Member/MypageDelMember";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {/* 각자 라우트 추가하기~~ */}
          <Route path="/" element={<Home />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/mileageinfo" element={<MileageInfo />} />
          <Route path="/mypage_main" element={<MypageMain />} />
          <Route path="/mypage_info" element={<MypageInfo />} />
          <Route path="/mypage_delMember" element={<MypageDelMember />} />
          <Route path="/mypage_qna" element={<MypageQna />} />
          <Route path="/market_list" element={<MarketList />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
