import styled from "styled-components";

export const HeroSection = styled.section`
  background: url(${props => props.img}) center/cover no-repeat;
  height: 520px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: white;
  text-align: center;

  .overlay {
    background: rgba(0, 0, 0, 0.5);
    padding: 40px;
    border-radius: 12px;
  }

  h1 {
    font-size: 2.8rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .buttons {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

export const CTAButton = styled.button`
  background: ${props => (props.secondary ? '#fff' : 'linear-gradient(to right, #6cc15b, #52b3ff)')};
  color: ${props => (props.secondary ? '#228b22' : 'white')};
  padding: 12px 24px;
  font-size: 1rem;
  border: ${props => (props.secondary ? '2px solid #228b22' : 'none')};
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    opacity: 0.85;
  }
`;

export const InfoSection = styled.section`
  background: #f9f9f9;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 40px;
    color: #333;
  }

  .card-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 300px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);

    h3 {
      color: #228b22;
      margin-bottom: 10px;
    }

    p {
      color: #444;
      font-size: 0.95rem;
    }
  }
`;

export const IconMenuSection = styled.section`
  background: white;
  padding: 40px 20px;
  text-align: center;

  ul {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

    li {
      font-size: 1.1rem;
      padding: 16px;
      border-radius: 50px;
      background: #f0f8f4;
      min-width: 120px;
    }
  }
`;

export const NewsSection = styled.section`
  background: #f5f5f5;
  padding: 60px 20px;
  text-align: center;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 32px;
    color: #222;
  }

  .news-cards {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .news {
    background: white;
    border-radius: 12px;
    max-width: 300px;
    text-align: left;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);

    img {
      width: 100%;
      height: 180px;
      object-fit: cover;
    }

    h4 {
      padding: 12px 16px 0;
      font-size: 1.1rem;
      color: #228b22;
    }

    p {
      padding: 0 16px 16px;
      font-size: 0.9rem;
      color: #555;
    }
  }
`;
