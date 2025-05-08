import styled from "styled-components";

export const HeroSection = styled.section`
  background: url(${props => props.img}) center/cover no-repeat;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }

  div {
    position: relative;
    z-index: 1;

    h1 {
      font-size: 2.5rem;
      font-weight: bold;
    }

    p {
      font-size: 1.2rem;
      margin-top: 10px;
    }
  }
`;

export const LightSection = styled.section`
  background: #f5f9f6;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 30px;
    color: #228b22;
  }

  p {
    font-size: 1rem;
    margin-top: 12px;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
    list-style: none;
    padding: 0;

    li {
      background: white;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      max-width: 300px;
      font-size: 1rem;
      flex: 1;
    }
  }
`;

export const CTAButton = styled.button`
  background: linear-gradient(to right, #6cc15b, #52b3ff);
  color: white;
  padding: 14px 28px;
  font-size: 1.1rem;
  border: none;
  border-radius: 30px;
  margin-top: 24px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(to right, #5aa94a, #3d97e0);
  }
`;

export const ActionList = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;

  li {
    flex: 1;
    min-width: 240px;
    background-color: #e6f4ea;
    border-radius: 12px;
    padding: 20px;

    h3 {
      margin-bottom: 10px;
      color: #2f6d38;
    }

    p {
      margin-bottom: 12px;
    }
  }
`;

export const SimpleList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  list-style: none;
  padding-left: 0;

  li::before {
    content: "✔ ";
    color: #228b22;
  }
`;
