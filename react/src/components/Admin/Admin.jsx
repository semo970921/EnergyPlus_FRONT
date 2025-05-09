import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdminMain/AdminMain";

const adminItems = [
  {
    title: "마일리지 신청",
    description: "사용자의 마일리지 적립 요청을 확인하고 승인합니다.",
  },
  {
    title: "회원 관리",
    description: "가입된 회원 정보를 조회하고 관리합니다.",
  },
  {
    title: "카드뉴스 관리",
    description: "홈페이지에 노출될 카드뉴스를 등록/수정합니다.",
  },
  {
    title: "커뮤니티 관리",
    description: "커뮤니티 게시글과 댓글을 검토하고 관리합니다.",
  },
  {
    title: "챌린지 관리",
    description: "진행 중인 챌린지를 생성하거나 종료합니다.",
  },
  {
    title: "공지사항 관리",
    description: "전체 사용자에게 보여질 공지사항을 작성합니다.",
  },
  {
    title: "QnA 관리",
    description: "사용자의 문의(QnA)를 확인하고 답변합니다.",
  },
];

const Admin = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex" }}>
      <AdminSidebar />
      <div style={{ padding: "30px", flex: 1 }}>
        <h2>관리자님 환영합니다.</h2>
        <h5 style={{ marginBottom: "20px" }}>
          아래는 각 권한에 대한 간단한 설명입니다.
        </h5>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
          }}
        >
          {adminItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
              }}
            >
              <h3 style={{ marginBottom: "10px", fontSize: "18px" }}>
                {item.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#555" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
