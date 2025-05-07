import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const MileageStore = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [category, setCategory] = useState("");
  const token = sessionStorage.getItem("accessToken");
  const mileage = 3000;

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get("http://localhost/mileages/stores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setItems(response.data);
        setFilteredItems(response.data);
        console.log("받아온 데이터:", response.data);
      } catch (error) {
        console.error("마일리지 사용처 로딩 실패:", error);
      }
    };

    fetchStores();
  }, []);

  const filterItems = (category) => {
    setCategory(category);
    if (category === "") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        items.filter((item) => item.mileageStoreCategory === category)
      );
    }
  };

  return (
    <Container>
      <MileageText>
        나의 보유 마일리지 : <strong>{mileage}</strong> 💰
      </MileageText>
      <ButtonGroup>
        <FilterButton onClick={() => filterItems("")}>전체</FilterButton>
        <FilterButton onClick={() => filterItems("기부")}>기부</FilterButton>
        <FilterButton onClick={() => filterItems("상품권")}>
          상품권
        </FilterButton>
      </ButtonGroup>
      <CardGrid>
        {filteredItems.map((item) => (
          <Card key={item.mileageStoreSeq}>
            <Type>{item.mileageStoreCategory}</Type>
            <Name>{item.mileageStoreName || "이름 없음"}</Name>
            <Footer>
              <Mileage>💰 {item.mileageStorePrice}</Mileage>
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
  padding: 50px;
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
  background-color: #dcf3b7;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #408c70;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background-color: #dcf3b7;
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
  background-color: #408c70;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
`;
