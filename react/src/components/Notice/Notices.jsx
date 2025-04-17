import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    Container,
    TabMenu,
    Tab,
    NoticeBox,
    NoticeHeader,
    NoticeList,
    NoticeItem,
    Pagination,
    PageBtn,
    SearchBox,
    SearchInput,
    SearchButton,
  } from "./Notices.style";
  



const Notices = () => {

    const [notices, setNotices] = useState([]);
    const [activeTab, setActiveTab] = useState("공지사항");

    const navigate = useNavigate();


    useEffect(() => {
        axios.get("http://localhost/notices")
          .then((res) => {
            setNotices(res.data);
          })
          .catch((err) => {
            console.error("공지사항 불러오기 실패", err);
          });
      }, []);


    return (
        
        <Container>
        <TabMenu>
            {["공지사항", "FAQ", "중고 거래"].map((tab) => (
            <Tab
                key={tab}
                active={activeTab === tab}
                onClick={() => setActiveTab(tab)}
            >
                {tab}
            </Tab>
            ))}
        </TabMenu>

        <NoticeBox>
            <NoticeHeader onClick={() => navigate("/notices")}>공지사항</NoticeHeader>
            <NoticeList>
                {notices.map((item) => (
                <NoticeItem key={item.noticeId}
                onClick={() => {
                  setTimeout(() => {
                    navigate(`/notices/${item.noticeId}`);
                  }, 300);
                }}
              >
                <span>{item.noticeTitle}</span>
                <span>{item.noticeDate}</span>
                </NoticeItem>
            ))}
            </NoticeList>
        </NoticeBox>

        <Pagination>
            <PageBtn>{"<<"}</PageBtn>
            {[1, 2, 3].map((num) => (
            <PageBtn key={num}>{num}</PageBtn>
            ))}
            <PageBtn>{">>"}</PageBtn>
        </Pagination>

        <SearchBox>
            <SearchInput type="text" placeholder="검색어 입력" />
            <SearchButton>검색</SearchButton>
        </SearchBox>
        </Container>

    );
};
export default Notices;