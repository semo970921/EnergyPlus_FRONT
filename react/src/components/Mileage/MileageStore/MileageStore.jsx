import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const MileageStore = () => {
  const [items, setItems] = useState([]);
  const mileage = 3000;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost/mileages/stores");
        setItems(response.data);
        console.log("받아온 데이터:", response.data);
      } catch (error) {
        console.error("마일리지 사용처 로딩 실패:", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <Container>
      <MileageText>
        나의 보유 마일리지 : <strong>{mileage}</strong> 🛈
      </MileageText>
      <ButtonGroup>
        <FilterButton>전체</FilterButton>
        <FilterButton>기부</FilterButton>
        <FilterButton>상품권</FilterButton>
      </ButtonGroup>
      <CardGrid>
        {items.map((item, idx) => (
          <Card key={idx}>
            <Type>{item.mileageStoreCategory}</Type>{" "}
            {/* 수정: mileageStoreCategory */}
            <Name>{item.mileageStoreName || "이름 없음"}</Name>{" "}
            {/* 수정: mileageStoreName */}
            <Footer>
              <Mileage>💰 {item.mileageStorePrice}</Mileage>{" "}
              {/* 수정: mileageStorePrice */}
              <UseButton>사용하기</UseButton>
            </Footer>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default MileageStore;

const Container = styled.div`
  padding: 20px;
  font-family: "Arial", sans-serif;
`;

const MileageText = styled.div`
  font-size: 16px;
  margin-bottom: 20px;
  strong {
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: #dfe6e9;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #b2bec3;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: #f1f2f6;
  padding: 16px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
`;

const Type = styled.div`
  font-size: 14px;
  color: #636e72;
  margin-bottom: 10px;
`;

const Name = styled.div`
  font-size: 16px;
  font-weight: bold;
  flex-grow: 1;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Mileage = styled.div`
  font-size: 14px;
`;

const UseButton = styled.button`
  padding: 6px 12px;
  background-color: #2d3436;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
`;
