import styled from "styled-components";

export const Hero = styled.section`
  height: 550px;
  background: url(${props => props.img}) center/cover no-repeat;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 4vw;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

export const HeroContent = styled.div`
  position: relative;
  color: white;
  max-width: 500px;

  h1 {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 14px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 24px;
  }

  div {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border: ${props => (props.secondary ? "2px solid white" : "none")};
  background: ${props =>
    props.secondary ? "transparent" : "linear-gradient(to right, #228b22, #66bb6a)"};
  color: white;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.85;
  }
`;

export const Button2 = styled.button`
  padding: 12px 24px;
  font-size: 1rem;
  border: 2px solid #228b22;
  color: #228b22;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 0.85;
  }
`;

export const InfoSectionGrid = styled.section`
  background: #f9f9f9;
  padding: 60px 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;

  .text-block {
    flex: 1;
    min-width: 300px;

    h2 {
      color: #228b22;
      font-size: 1.8rem;
      margin-bottom: 16px;
    }

    p {
      font-size: 1rem;
      line-height: 1.6;
      color: #333;
    }
  }

  .cards-block {
    flex: 2;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`;

export const InfoCard = styled.div`
  width: 170px;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  text-align: center;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CardImage = styled.div`
  height: 200px;
  background: #ddd center/cover no-repeat;
  border-radius: 10px 10px 0 0;
`;

export const CardTitle = styled.div`
  padding: 12px 8px;
  font-size: 1rem;
  color: #228b22;
  font-weight: bold;
`;

export const HighlightSection = styled.section`
  background: #ffffff;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.8rem;
    color: #228b22;
    margin-bottom: 32px;
  }
`;

export const HighlightGrid = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`;

export const HighlightItem = styled.div`
  width: 220px;
  background: #f6f6f6;
  padding: 24px;
  border-radius: 10px;
  text-align: center;

  svg {
    color: #228b22;
    margin-bottom: 12px;
  }

  strong {
    display: block;
    margin-bottom: 8px;
    font-size: 1rem;
    color: #2e7d32;
  }

  p {
    font-size: 0.9rem;
    color: #555;
  }
`;

export const ParticipateSection = styled.section`
  position: relative;
  height: 360px;

  .background {
    background: url(${props => props.img}) center/cover no-repeat;
    width: 80%;
    height: 100%;
    margin-left: auto;
    border-radius: 5px;
  }

  .overlay {
    position: absolute;
    top: 15%; /* 이미지 위 20% 지점에 걸치도록 */
    background: #2e7d32;
    color: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 300px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

    h2 {
      font-size: 1.2rem;
      margin-bottom: 10px;
      margin-top: 5px;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }
  }
`;

export const MileageSection = styled.section`
  background: #f9f9f9;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.6rem;
    color: #228b22;
    margin-bottom: 20px;

    svg {
      margin-right: 6px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin-bottom: 16px;

    li {
      font-size: 1rem;
      margin: 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
    }
  }

  p {
    color: #555;
    margin-bottom: 20px;
  }
`;

export const ActionSection = styled.section`
  background: white;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.6rem;
    color: #228b22;
    margin-bottom: 24px;
  }
`;

export const StepSection = styled.section`
  background: #e8f5e9;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.6rem;
    color: #2e7d32;
    margin-bottom: 24px;
  }
`;

export const StepList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 24px;
  list-style: none;

  li {
    background: #c8e6c9;
    padding: 10px 16px;
    border-radius: 20px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
`;
