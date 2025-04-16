import "./App.css";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Common/Footer/Footer";
import Header from "./components/Common/Header/Header";
import Home from "./components/Common/Home/Home";
import Mypage_main from "./components/Mypage/Mypage_main";
import Notices from "./components/Notice/Notices";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notices" element={<Notices />} />
        {/* 각자 라우트 추가하기~~ */}
        <Route path="/mypage_main" element={<Mypage_main />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
