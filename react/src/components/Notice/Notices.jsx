import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



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
                <NoticeItem key={item.noticeId}>
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


    const Container = styled.div`
    padding: 30px 80px;
    `;

    const TabMenu = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
    `;

    const Tab = styled.button`
    background-color: ${(props) => (props.active ? "#4CAF75" : "#ddd")};
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    `;

    const NoticeBox = styled.div`
    border: 1px solid #4CAF75;
    border-radius: 8px;
    overflow: hidden;
    `;

    const NoticeHeader = styled.div`
    background-color: #4CAF75;
    color: white;
    padding: 14px;
    font-weight: bold;
    `;

    const NoticeList = styled.div`
    display: flex;
    flex-direction: column;
    `;

    const NoticeItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 14px 20px;
    border-top: 1px solid #eee;
    `;

    const Pagination = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 30px 0 20px;
    `;

    const PageBtn = styled.button`
    background-color: #4CAF75;
    color: white;
    border: none;
    padding: 6px 14px;
    border-radius: 50%;
    cursor: pointer;
    `;

    const SearchBox = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    `;

    const SearchInput = styled.input`
    width: 250px;
    padding: 8px 12px;
    `;

    const SearchButton = styled.button`
    background-color: #4CAF75;
    color: white;
    padding: 8px 20px;
    border: none;
    cursor: pointer;
    `;