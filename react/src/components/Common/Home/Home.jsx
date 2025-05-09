import styled from "styled-components";
import CardNewsMain from "../../CardNews/CardNewsMain";
import MainSection1 from "../../Main/MainSection1";
import MainSection2 from "../../Main/MainSection2";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <br/>
        <MainSection2 />
        <MainSection1 />
        <CardNewsMain />
      </HomeLayout>
    </>
  );
};
export default Home;

const HomeLayout = styled.div`
  height: 4750px;
  min-height: 600px;
`;
