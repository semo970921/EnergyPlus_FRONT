import React from "react";
import AdminSidebar from "./AdminSidebar";
import AdminMain from "./AdminMain/AdminMain";

const Admin = () => {
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <AdminMain />
    </div>
  );
};

export default Admin;
