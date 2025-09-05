import Header from "../../components/header/Header";
import Main from "../../components/main/Main";
import { Container } from "@chakra-ui/react";

function Home() {
  return (
    <Container maxW="1200px" mx="auto" p={4}>
      <Main />
    </Container>
  );
}

export default Home;
