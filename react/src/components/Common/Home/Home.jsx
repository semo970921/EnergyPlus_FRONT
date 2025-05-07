import styled from "styled-components";
import MainSection1 from "../../Main/MainSection1";

const Home = () => {
  return (
    <>
      <HomeLayout>
        <MainSection1 />
      </HomeLayout>
    </>
  );
};
export default Home;

const HomeLayout = styled.div`
  height: 600px;
`;
