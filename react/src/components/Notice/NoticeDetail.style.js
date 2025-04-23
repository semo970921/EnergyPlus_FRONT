import styled from "styled-components";

// 전체 래퍼 (가운데 정렬 + 여백)
export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

// 헤더: 제목과 버튼 그룹
export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

// 페이지 제목
export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
`;

// 수정/삭제 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// 단일 버튼 (variant="delete" 면 붉은색)
export const Button = styled.button`
  padding: 8px 16px;
  background-color: ${({ variant }) =>
    variant === "delete" ? "#ff4d4f" : "#85C662"};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// 본문 카드
export const ContentWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
`;

// 카드 헤더: 제목 좌측, 날짜 우측
export const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-weight: 500;
  font-size: 1.25rem;

  span:first-child {
    flex: 1;
  }
  span:last-child {
    font-size: 0.875rem;
    color: #999;
  }
`;

// 본문 텍스트
export const ContentBody = styled.div`
  font-size: 1rem;
  color: #333;
  line-height: 1.6;
`;

// 뒤로가기 버튼
export const BackBtn = styled.button`
  display: block;
  margin: 0 auto;
  padding: 8px 20px;
  border: 1px solid #85C662;
  background: transparent;
  color: #85C662;
  border-radius: 4px;
  cursor: pointer;
`;
