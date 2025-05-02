import styled from "styled-components";
import CardNewsMain from "../../CardNews/CardNewsMain";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <CardNewsMain />
      </HomeLayout>
    </>
  );
};
export default Home;

const HomeLayout = styled.div`
  min-height: 600px;
`;
