import { useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
/* 관리자 페이지 구현 */
const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminSidebar />
      <div>어드민 페이지</div>
    </>
  );
};

export default Admin;
